import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
// import { DatabaseMemory } from './database-memory.js'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, response) => {
    const { title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration,
    })

    return response.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', (request,response) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    const video = database.update(videoId,{
        title,
        description,
        duration,
    })

    return response.status(204).send()
})

server.delete('/videos/:id', (request,response) => {
    const videoId = request.params.id
    
    database.delete(videoId)

    return response.status(204)
})

server.listen({
    port: 3333,
})