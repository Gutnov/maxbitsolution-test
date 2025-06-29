import type { CocktailApiItem, CocktailItem, Ingredient } from '../model/types'

export const extractIngredientsAndMeasures = (cocktail: CocktailApiItem): Ingredient[] => {
  const ingredients: Ingredient[] = []
  
  Object.keys(cocktail).forEach(key => {
    if (key.startsWith('strIngredient')) {
      const ingredientValue = cocktail[key as keyof CocktailApiItem] as string
      if (ingredientValue && ingredientValue.trim()) {
        const ingredientNumber = key.replace('strIngredient', '')
        const measureKey = `strMeasure${ingredientNumber}` as keyof CocktailApiItem
        const measureValue = cocktail[measureKey] as string
        
        ingredients.push({
          name: ingredientValue.trim(),
          measure: measureValue && measureValue.trim() ? measureValue.trim() : null
        })
      }
    }
  })
  
  return ingredients
}

export const mapCocktailApiToCocktailItem = (apiCocktail: CocktailApiItem): CocktailItem => {
  const ingredients = extractIngredientsAndMeasures(apiCocktail)
  
  return {
    id: apiCocktail.idDrink,
    name: apiCocktail.strDrink,
    alternateName: apiCocktail.strDrinkAlternate,
    category: apiCocktail.strCategory,
    alcoholic: apiCocktail.strAlcoholic,
    glass: apiCocktail.strGlass,
    instructions: apiCocktail.strInstructions,
    image: apiCocktail.strDrinkThumb,
    dateModified: apiCocktail.dateModified,
    ingredients
  }
}

export const mapCocktailApiResponse = (apiResponse: CocktailApiItem[]) => {
  return apiResponse.map(mapCocktailApiToCocktailItem)
}