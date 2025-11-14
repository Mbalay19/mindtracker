// Middleware para asegurar que el usuario está logueado
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function verifyToken (req, res, next) {
  const token = req.cookies?.jwt
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' })
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    return res.status(401).clearCookie('jwt').json({ error: 'Token inválido' })
  }
}

// export function verifyAdmin (req, res, next) {
//   if (!req.user) return res.redirect('/login.html')
//   if (req.user.role !== 'admin') return res.status(403).send('Acceso denegado')
//   next()
// }

export function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('../../frontend/login.html')
}
