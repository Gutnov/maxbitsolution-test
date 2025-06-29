export type CocktailApiItem = {
  idDrink: string
  strDrink: string
  strDrinkAlternate: string | null
  strTags: string | null
  strVideo: string | null
  strCategory: string | null
  strIBA: string | null
  strAlcoholic: string | null
  strGlass: string | null
  strInstructions: string | null
  strInstructionsES: string | null
  strInstructionsDE: string | null
  strInstructionsFR: string | null
  strInstructionsIT: string | null
  strInstructionsZH_HANS: string | null
  strInstructionsZH_HANT: string | null
  strDrinkThumb: string | null
  strImageSource: string | null
  strImageAttribution: string | null
  strCreativeCommonsConfirmed: string | null
  dateModified: string | null
} & {
  [K in `strIngredient${number}`]: string | null
} & {
  [K in `strMeasure${number}`]: string | null
}

export type CocktailItem = {
  id: string
  name: string
  alternateName: string | null
  category: string | null
  alcoholic: string | null
  glass: string | null
  instructions: string | null
  image: string | null
  dateModified: string | null
  ingredients: Ingredient[]
}

export type Ingredient = {
  name: string
  measure: string | null
}

export type CocktailApiResponse = CocktailApiItem[]

export type CocktailMappedResponse = CocktailItem[]
  