import express from 'express'
import { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } from './database.js'

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Routes
app.get("/recipes", async (req, res) => {
    const recipes = await getRecipes()
    res.render("recipes.ejs", { recipes })
})

app.get("/recipes/createRecipe", async (req, res) => {
    res.render("createRecipe.ejs")
})

app.get("/recipes/:id", async (req, res) => {
    const id = req.params.id
    const recipe = await getRecipe(id)
    res.render("singleRecipe.ejs", { recipe })
})

app.post("/recipes", async (req, res) => {
    console.log(req.body, 'this is the req body')
    const { recipe_Name, recipe_Ingredients, recipe_Instructions, recipe_Cuisine } = req.body
    await createRecipe(recipe_Name, recipe_Ingredients, recipe_Instructions, recipe_Cuisine)
    res.redirect("/recipes")
})



// Error Logging
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Oops! Something went wrong!")
})

app.use(express.static("public"))

app.listen(5467, () => {
    console.log("Server is running on port 5467")
})