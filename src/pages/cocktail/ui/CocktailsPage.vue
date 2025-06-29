<template>
  <div class="cocktail-page">
    <h1 class="cocktail-page__title">
      Cocktails
    </h1>
    <div class="container">
      <div class="cocktail-page__content">
        <SidebarMenu :cocktail-codes="COCKTAIL_CODES" />
        <CocktailList :cocktail-code="cocktailCode" />
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import CocktailList from '@/features/cocktail/ui/CocktailList.vue'
import SidebarMenu from '@/widgets/sidebar-menu/ui/SidebarMenu.vue'
import { COCKTAIL_CODES } from '@/shared/model/config'
interface Props {
  cocktailCode: string
}

defineProps<Props>()
</script>
  
<style scoped lang="scss">
.cocktail-page {
  padding: 40px 0;
  min-height: 100vh;
}

.cocktail-page__content {
  display: flex;
  gap: 2vw;
  align-items: flex-start;
}

.cocktail-page__title {
  text-align: center;
  margin-bottom: 40px;
}

@media screen and (max-width: 768px) {
  .cocktail-page__content {
    flex-direction: column;
  }
}
</style>