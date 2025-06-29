<template>
  <div class="cocktail-list">
    <div
      v-if="cocktailStore.isLoading"
      class="cocktail-list__loading"
    >
      Загрузка коктейлей...
    </div>
    <div
      v-else-if="cocktailStore.error"
      class="cocktail-list__error"
    >
      {{ cocktailStore.error }}
    </div>
    <div
      v-else-if="cocktailStore.cocktails.length === 0"
      class="cocktail-list__empty"
    >
      {{ emptyMessage }}
    </div>
    <div
      v-else
      class="cocktail-list__content"
    >
      <CocktailItem
        v-for="cocktail in cocktailStore.cocktails"
        :key="cocktail.id"
        :cocktail-item="cocktail"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CocktailItem  from '@/entities/cocktail/ui/CocktailItem.vue'
import { ref, watch } from 'vue'
import { useCocktailStore } from '@/entities/cocktail/model/cocktailStore'

interface Props {
  cocktailCode: string
}

const props = defineProps<Props>()

const cocktailStore = useCocktailStore()

const loadCocktails = async (code: string) => {
  await cocktailStore.fetchCocktailsByCode(code)
}

watch(() => props.cocktailCode, (newCode) => {
  if (newCode) {
    loadCocktails(newCode)
  }
}, { immediate: true })

const emptyMessage = ref('Пока ничего нет')

</script>

<style scoped lang="scss">
.cocktail-list {
  width: 100%;
}
.cocktail-list__content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cocktail-list__loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.cocktail-list__empty {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.cocktail-list__error {
  width: 100%;
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #d32f2f;
  background: #fff0f0;
  border: 1px solid #d32f2f;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>