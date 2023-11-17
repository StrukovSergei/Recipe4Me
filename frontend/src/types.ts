export interface Recipe {
    id: number
    title: string
    image: string
    imageType: string
}

export interface RecipeSummary {
    id: number
    title: string
    summary: string
}

export interface RecipeInfo {
    id: number
    title: string
    vegan: boolean
    glutenFree: boolean
    readyInMinutes: number
    servings: number
    image: string
    imageType: string
    healthScore: number
    analyzedInstructions: Array<String>
}