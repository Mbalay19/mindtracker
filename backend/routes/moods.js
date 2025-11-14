import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { MoodController } from '../controllers/moods.js'
import { verifyToken } from '../middleware/authentication.js'
import passport from 'passport'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const moodRouter = Router()

moodRouter.get('/', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'))
})

// Ruta para registrarse
moodRouter.post('/auth/register', MoodController.createUser)

// Ruta del login normal
moodRouter.post('/auth/login', MoodController.loginUser)

// Ruta login con Google
moodRouter.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

moodRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login.html' }),
  (req, res) => {
    const token = MoodController.generateJWT(req.user)
    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.redirect('/')
  })

// Ruta de logout
moodRouter.post('/auth/logout', (req, res) => {
  res.clearCookie('jwt')
  res.json({ success: true })
})

// TO DO. Añadir admin para rutas protegidas

moodRouter.post('/api/users/moods', verifyToken, MoodController.addMood)
moodRouter.post('/api/users/logs', verifyToken, MoodController.getLogs)
