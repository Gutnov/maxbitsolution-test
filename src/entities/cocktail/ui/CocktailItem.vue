<template>
  <div class="cocktail">
    <div class="cocktail__info">
      <h2 class="cocktail__title">
        {{ cocktailItem.name }}
      </h2>
      <ul class="cocktail__tags">
        <li
          v-for="tag in tagsList"
          :key="tag.key"
          class="cocktail__tag"
        >
          {{ tag.value }}
        </li>
      </ul>
      <h3 class="cocktail__subtitle">
        Instruction:
      </h3>
      <p class="cocktail__instructions">
        {{ cocktailItem.instructions }}
      </p>
      <h2 class="cocktail__subtitle">
        List of ingredients:
      </h2>
      <table class="cocktail__ingredients-table">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Measure</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ingredient in cocktailItem.ingredients"
            :key="`${ingredient.name}-${ingredient.measure}`"
            class="cocktail__ingredient-row"
          >
            <td>{{ ingredient.name }}</td>
            <td>{{ ingredient.measure || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="cocktail__image">
      <LazyImage
        :src="cocktailItem.image || ''"
        :alt="cocktailItem.name"
      />
    </div>
  </div>
</template>
  
<script setup lang="ts">
import LazyImage from '@/shared/ui/LazyImage.vue'
import { computed } from 'vue'
import type { CocktailItem } from '../model/types'

const props = defineProps<{
  cocktailItem: CocktailItem
}>()
  
const tagsList = computed(() => {
  const tags = [
    { key: 'category', value: props.cocktailItem.category },
    { key: 'alcoholic', value: props.cocktailItem.alcoholic },
    { key: 'glass', value: props.cocktailItem.glass }
  ]
  return tags.filter(tag => tag.value)
})
</script>
  
<style scoped lang="scss">
.cocktail {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  box-shadow: 1px 4px 28px 0px rgba(34, 60, 80, 0.2);
  border-radius: 8px;
  padding: 16px;
  background-color: white;
}

@media (min-width: 768px) {
  .cocktail {
    grid-template-columns: repeat(2, 1fr);
  }
}

.cocktail__title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
}

.cocktail__tags {
  margin: 12px 0;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cocktail__tags > li {
  margin-bottom: 0;
}

.cocktail__tag {
  display: inline-block;
  background: #54be54;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.cocktail__tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.cocktail__subtitle {
  font-size: 18px;
  font-weight: bold;
  margin: 12px 0;
}

.cocktail__instructions {
  font-size: 14px;
  margin: 12px 0;
}

.cocktail__ingredients {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 12px 0;
  padding: 0;
  list-style: disc;
}

.cocktail__ingredient {
  display: inline-flex;
  list-style: disc;
}

.cocktail__image {
  padding: 0 8px;
}

@media (min-width: 640px) {
  .cocktail__image {
    order: 1;
    padding: 0;
  }
}

@media (min-width: 1024px) {
  .cocktail__image {
    padding: 0 24px;
  }
}

.cocktail__ingredients-table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  font-size: 14px;
}

.cocktail__ingredients-table th {
  background-color: #f3f4f6;
  padding: 8px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #e5e7eb;
}

.cocktail__ingredient-row td {
  padding: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.cocktail__ingredient-row:nth-child(even) {
  background-color: #f9fafb;
}
</style>
