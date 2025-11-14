import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function generateToken (user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
}
