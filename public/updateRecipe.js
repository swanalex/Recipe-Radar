

async function updateRecipe(event, recipeId) {
    event.preventDefault()

    const name = event.target.updated_Name.value
    const ingredients = event.target.updated_Ingredients.value
    const instructions = event.target.updated_Instructions.value
    const cuisine = event.target.updated_Cuisine.value

    try {
        const response = await fetch(`/recipes/${recipeId}/updateRecipe`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ name, ingredients, instructions, cuisine })
        })

        if (response.ok) {
            alert('Recipe updated successfully!')
            window.location.href = '/recipes'
        } else {
            alert('Failed to update this recipe!')
        }
    }   catch (error) {
        console.error('Error updating this recipe: ', error)
        alert('An error occurred while updating this recipe')
    }
}