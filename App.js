import express, { json } from 'express'
import { moodRouter } from './routes/moods.js'

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(json())
app.disable('x-powered-by')

app.use('/', moodRouter)

const PORT = process.env.PORT ?? 2345

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
