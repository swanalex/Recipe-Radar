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

const recipe = await getRecipe(1);
console.log(recipe)