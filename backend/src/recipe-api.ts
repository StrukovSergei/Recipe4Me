import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
    if (!apiKey) {
        throw new Error("API Key not found")
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch")

    const queryParams = {
        apiKey,
        query: searchTerm,
        number: "10",
        offset: (page * 10).toString()
    }

    url.search = new URLSearchParams(queryParams).toString()

    try {
        const searchResponse = await fetch(url)
        const resultsJson = await searchResponse.json()

        return resultsJson
    } catch (error) {
        console.log(error)
    }

}

export const getRecipeSummary = async (recipeId: string) => {
    if (!apiKey) {
        throw new Error("API Key not found")
    }

    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`)

    const queryParams = {
        apiKey,
    }

    url.search = new URLSearchParams(queryParams).toString()

    try {
        const searchResponse = await fetch(url)
        const resultsJson = await searchResponse.json()

        return resultsJson
    } catch (error) {
        console.log(error)
    }
}

export const getFavouriteRecipesByIDs = async (ids: string[]) => {
    if (!apiKey) {
        throw new Error("API Key not found")
    }

    const url = new URL("https://api.spoonacular.com/recipes/informationBulk")
    const queryParams = {
        apiKey,
        ids: ids.join(",")
    }

    url.search = new URLSearchParams(queryParams).toString()

    try {
        const searchResponse = await fetch(url)
        const resultsJson = await searchResponse.json()

        return { results: resultsJson }
    } catch (error) {
        console.log(error)
    }
}

export const getRecipeInfo = async (recipeId: string) => {
    if (!apiKey) {
        throw new Error("API Key not found")
    }

    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/information`)
    const includeInstruction = "true"

    const queryParams = {
        apiKey,
        query: includeInstruction,
    }

    url.search = new URLSearchParams(queryParams).toString()

    try {
        const searchResponse = await fetch(url)
        const resultsJson = await searchResponse.json()

        return resultsJson
    } catch (error) {
        console.log(error)
    }
}