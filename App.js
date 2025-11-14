import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { moodRouter } from './backend/routes/moods.js'
import passport from './backend/config/passport.js'

const app = express()

// Middleware de cookies ANTES de las rutas
app.use(cookieParser())
app.use(express.static('frontend'))
app.use(express.urlencoded({ extended: false }))
app.use(json())
app.disable('x-powered-by')

// Configurar sesión para Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambiar a true en producción con HTTPS
}))

// Inicializar Passport
app.use(passport.initialize())
app.use(passport.session())

app.use('/', moodRouter)

const PORT = process.env.PORT ?? 2345

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
