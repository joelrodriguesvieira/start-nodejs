import { randomUUID } from "node:crypto"
import pool from "./db.js"

export class DatabasePostgres {
    async list(search) {
        try {
            let query = 'SELECT * FROM videos'
            const values = []

            if (search) {
                query = `SELECT * FROM videos WHERE title ILIKE $1 OR description ILIKE $1`
                values.push(`%${search}%`)
            }

            const result = await pool.query(query, values)
            return result.rows
        } catch (err) {
            console.error('Error executing query', err.stack)
            throw err
        }
    }

    async create(video) {
        const videoId = randomUUID()
        const {title,description,duration} = video

        try {
            const query = `INSERT INTO videos (id, title, description, duration) VALUES ($1, $2, $3, $4) RETURNING *;`
            const values = [videoId, title, description,duration]

            const result = await pool.query(query,values)
        } catch (err) {
            console.error('Error executing query', err.stack)
            throw err
        }
    }

    async update(id,video) {
        const { title, description, duration} = video

        try {
            const query = `UPDATE videos SET title = $1, description = $2, duration = $3 WHERE id = $4;`
            const values = [title, description,duration, id]

            const result = await pool.query(query,values)
        } catch (err) {
            console.error('Error executing query', err.stack)
            throw err
        }
    }

    async delete(id) {
        try {
            const query = `DELETE FROM videos WHERE id = $1;`

            const result = await pool.query(query,[id])
        } catch (err) {
            console.error('Error executing query', err.stack)
            throw err
        }
    }
}