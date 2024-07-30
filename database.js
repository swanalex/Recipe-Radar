import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function getRecipes() {
    const [result] = await pool.query('SELECT * FROM recipes')
    return result
}

export async function getRecipe(id) {
    const [result] = await pool.execute(`
        SELECT * FROM recipes
        WHERE id = ?`, [id])
    return result[0]
}

export async function createRecipe(name, ingredients, instructions, cuisine) {
    const [result] = await pool.execute(`
        INSERT INTO recipes (name, ingredients, instructions, cuisine)
        VALUES (?, ?, ?, ?)`, [name, ingredients, instructions, cuisine])
    const id = result.insertId
    return getRecipe(id)
}

export async function updateRecipe(name, ingredients, instructions, cuisine, id) {
    const query = `UPDATE recipes
                    SET name = ?, ingredients = ?, instructions = ?, cuisine = ?
                    WHERE id = ?`
    try {
        await pool.execute(query, [name, ingredients, instructions, cuisine, id])
        console.log(`Recipe with id ${id} updated!`)
        return
    }   catch (err) {
        console.error('Error executing this UPDATE query:', err)
    }
}

export async function deleteRecipe(id) {
    try {
        await pool.execute('DELETE FROM recipes WHERE id = ?', [id])
        console.log(`Recipe with id ${id} deleted`)
        return
    }   catch (err) {
        console.error('Error executing this DELETE query:', err)
    }
}
