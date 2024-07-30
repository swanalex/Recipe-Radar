import express from 'express'
import { getRecipes, getRecipe, updateRecipe, deleteRecipe } from './database.js'

const app = express()
app.use(express.json())

// Routes
app.get("/recipes", async (req, res) => {
    const recipes = await getRecipes()
    res.render("recipes.ejs", { recipes })
})

app.get("/recipes/:id", async (req, res) => {
    const id = req.params.id
    const recipe = await getRecipe(id)
    res.render("singleRecipe.ejs", { recipe })
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