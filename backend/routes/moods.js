import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { MoodController } from '../controllers/moods.js'
import { verifyToken, ensureAuthenticated } from '../middleware/authentication.js'
import passport from 'passport'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const moodRouter = Router()

moodRouter.get('/', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'))
})

// moodRouter.get('/users', UserModel.getAll)

// Le doy la alternativa en login.html para registrarse, loguearse con google o con email y password
moodRouter.post('/auth/login', MoodController.createUser, async (req, res) => {
  const { email, password } = req.body
  const result = await MoodController.loginUser({ email, password })
  if (result.error) return res.status(400).json({ message: result.error })

  // Guardamos JWT en cookie
  const token = MoodController.generateJWT(result.user)
  res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 1 día
  res.json({ success: true })
})

// Login con Google
moodRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
moodRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login.html' }),
  (req, res) => {
    const token = MoodController.generateJWT(req.user)
    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.redirect('/')
  }
)

moodRouter.post('/api/users/moods', ensureAuthenticated, MoodController.addMood)
moodRouter.get('/api/users/logs', ensureAuthenticated, MoodController.getLogs)
