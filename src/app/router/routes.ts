import type { RouteRecordRaw } from 'vue-router'

import { COCKTAIL_CODES } from '@/shared/model/config'
export type CocktailCode = typeof COCKTAIL_CODES[number]

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: `/${COCKTAIL_CODES[0]}`
  },
  ...COCKTAIL_CODES.map(cocktailCode => ({
    path: `/${cocktailCode}`,
    name: cocktailCode,
    component: () => import('@/pages/cocktail/ui/CocktailsPage.vue'),
    props: { cocktailCode }
  })),

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/not-found/ui/NotFoundPage.vue')
  }
]