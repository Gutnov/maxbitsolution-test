import { defineStore } from 'pinia'
import { ref } from 'vue'
import { cocktailApi } from '../api'

import type { CocktailItem, CocktailMappedResponse } from './types'

export const useCocktailStore = defineStore('cocktail', () => {
  const cocktails = ref<CocktailItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)


  const fetchCocktailsByCode = async (cocktailCode: string) => {
    if (!cocktailCode.trim()) {
      error.value = 'Поисковый запрос не может быть пустым'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response: CocktailMappedResponse = await cocktailApi.getCocktailsByCode(cocktailCode)
      
      if (response && response.length > 0) {
        cocktails.value = response
      } else {
        cocktails.value = []
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'TIMEOUT') {
          error.value = 'Время ожидания истекло. Попробуйте позже.'
        } else if (err.message === 'SERVER_ERROR') {
          error.value = 'Ошибка сервера. Попробуйте позже.'
        } else {
          error.value = err.message
        }
      } else {
        error.value = 'Произошла ошибка при загрузке коктейлей'
      }
      cocktails.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    cocktails,
    isLoading,
    error,
    fetchCocktailsByCode
  }
})
