

async function deleteRecipe(id) {
    try {
        const response = await fetch(`/recipes/${id}`, {
            method: 'DELETE'
        })

    if (response.ok) {
        alert("Recipe has been deleted!")
        window.location.href = '/recipes'

}   else {
        alert("We have failed to delete this recipe!")
    }

}   catch (error) {
        console.error("Error deleting this recipe: ", error)
        alert("An error has occurred while trying to delete this recipe!")
    }
}