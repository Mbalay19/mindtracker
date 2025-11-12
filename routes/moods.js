import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { MoodController } from '../controllers/moods.js'
import { UserModel } from '../models/mongodb.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const moodRouter = Router()

moodRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

moodRouter.get('/users', UserModel.getAll)
moodRouter.post('/users', MoodController.createUser)

moodRouter.post('/users/:_id/moods', MoodController.addMood)
moodRouter.get('/users/:_id/logs', MoodController.getLogs)
