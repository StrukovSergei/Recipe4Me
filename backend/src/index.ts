import express from 'express'
import cors from 'cors'
import * as RecipeAPI from './recipe-api'
import { PrismaClient } from "@prisma/client"

const app = express()
const prismaClient = new PrismaClient()

app.use(express.json())
app.use(cors())

app.get("/api/recipes/search", async (req, res) => {

    const searchTerm = req.query.searchTerm as string
    const page = parseInt(req.query.page as string)
    const results = await RecipeAPI.searchRecipes(searchTerm, page)

    return res.json(results)
})

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
    const recipeId = req.params.recipeId
    const results = await RecipeAPI.getRecipeSummary(recipeId)

    return res.json(results)
})

app.get("/api/recipes/:recipeId/information", async (req, res) => {
    const recipeId = req.params.recipeId
    const results = await RecipeAPI.getRecipeInfo(recipeId)

    return res.json(results)
})

app.post("/api/recipes/favourite", async (req, res) => {
    const recipeId = req.body.recipeId

    try {
        const favouriteRecipe = await prismaClient.favouriteRecipes.create(
            {
                data: {
                    recipeId
                }
            }
        )

        return res.status(201).json(favouriteRecipe)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Oops, something went wrong" })
    }
})


app.get("/api/recipes/favourite", async (req, res) => {
    try {
        const recipes = await prismaClient.favouriteRecipes.findMany()
        const recipeIds = recipes.map((recipe) => recipe.recipeId.toString())

        const favourites = await RecipeAPI.getFavouriteRecipesByIDs(recipeIds)

        return res.json(favourites)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Oops, something went wrong" })
    }
})


app.delete("/api/recipes/favourite", async (req, res) => {
    const recipeId = req.body.recipeId

    try {
        await prismaClient.favouriteRecipes.delete({
            where: {
                recipeId
            }
        })


        return res.status(204).send()
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Oops, something went wrong" })
    }
})


app.get("/api/recipes/random", async (req, res) => {
    try {
        const results = await RecipeAPI.getRandomRecipes()
        return res.json(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops, something went wrong" })
    }
})

app.get("/api/recipes/vegetarian", async (req, res) => {
    try {
        const results = await RecipeAPI.getVegetarianRecipes()
        return res.json(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops, something went wrong" })
    }
})

app.get("/api/recipes/dessert", async (req, res) => {
    try {
        const results = await RecipeAPI.getDessertRecipes()
        return res.json(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Oops, something went wrong" })
    }
})

app.listen(5000, () => {
    console.log("server running on localhost:5000")
})