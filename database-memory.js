import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.entries())
        .map((videoArray) => {
            const id = videoArray[0]
            const { title,description,duration } = videoArray[1]

            return {
                id,
                title,
                description,
                duration
            }
        })
        .filter(video => {
            if (search) {
                return video.title.includes(search)
            }

            return true
        })

    }

    create(video) {
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }

    update(id,video) {
        this.#videos.set(id,video)
    }

    delete(id,video) {
        this.#videos.delete(id)
    }
}