import { apiClient } from '@/shared/api/index'
import { useCacheStore } from '@/shared/model/cacheStore'
import type { CocktailApiResponse, CocktailMappedResponse } from '../model/types'
import { mapCocktailApiResponse } from '../lib'

export const cocktailApi = {
  async getCocktailsByCode(cocktailCode: string): Promise<CocktailMappedResponse> {
    const cacheStore = useCacheStore()
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailCode}`
    
    const cachedData = cacheStore.get<CocktailMappedResponse>(url)
    if (cachedData) {
      return cachedData
    }
    
    const response = await apiClient.get<{ drinks: CocktailApiResponse }>(url)
    const drinksArray = response.drinks || []
    const mappedResponse = mapCocktailApiResponse(drinksArray)
    cacheStore.set(url, mappedResponse)
    
    return mappedResponse
  }
}