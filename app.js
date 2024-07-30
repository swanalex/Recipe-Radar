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

app.get("/recipes/:id/updateRecipe", async (req, res) => {
    const id = req.params.id
    const recipe = await getRecipe(id)
    res.render("updateRecipe.ejs", { recipe })
})

app.get("/recipes/:id", async (req, res) => {
    const id = req.params.id
    const recipe = await getRecipe(id)
    res.render("singleRecipe.ejs", { recipe })
})

app.post("/recipes", async (req, res) => {
    // Destructuring assignment to extract form data from req.body
    const { recipe_Name, recipe_Ingredients, recipe_Instructions, recipe_Cuisine } = req.body
    // Using the extracted variables to create a new recipe
    await createRecipe(recipe_Name, recipe_Ingredients, recipe_Instructions, recipe_Cuisine)
    // Redirecting to the recipes page after successful creation
    res.redirect("/recipes")
})

app.put("/recipes/:id/updateRecipe", async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const { name, ingredients, instructions, cuisine } = req.body

    try {
        await updateRecipe(name, ingredients, instructions, cuisine, id)
        return res.status(200).json({
            message: "we have updated this recipe, hoorah!"
        })
    }   catch (err) {
        console.error("Error, Error!", err)
        res.status(500).json({
            message: "An error occurred while updating this recipe, sir!"
        })
    }
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