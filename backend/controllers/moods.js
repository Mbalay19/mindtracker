import { UserModel, MoodModel } from '../models/mongodb.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class MoodController {
  // CREAR USUARIO (REGISTRO)
  static async createUser (req, res) {
    try {
      const { name, lastName, telephone, email, password } = req.body

      if (!name || !lastName || !telephone || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' })
      }

      // Verificar si el usuario ya existe
      const existingUser = await UserModel.findByEmail(email)
      if (existingUser) {
        return res.status(400).json({ message: 'El email ya está registrado' })
      }

      const user = await UserModel.create({ name, lastName, telephone, email, password })

      return res.status(201).json({
        message: 'Usuario creado exitosamente',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      })
    } catch (error) {
      console.error('Error creating user:', error)
      return res.status(500).json({ error: 'Internal server Error' })
    }
  }

  // LOGIN
  static async loginUser (req, res) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña requeridos' })
      }

      const user = await UserModel.findByEmail(email)
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' })
      }

      const equal = await bcrypt.compare(password, user.password)
      if (!equal) {
        return res.status(400).json({ message: 'Contraseña incorrecta' })
      }

      const token = this.generateJWT(user)

      // Guardar JWT en cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 día
      })

      return res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      })
    } catch (error) {
      console.error('Error en login:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  // GENERAR JWT - CORREGIDO
  static generateJWT (user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role || 'user'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
  }

  // AGREGAR MOOD
  static async addMood (req, res) {
    try {
      const { mood, notes, date } = req.body

      if (!mood || !notes || !date) {
        return res.status(400).json({
          error: 'Todos los campos deben estar completos'
        })
      }

      const userId = req.user.id

      const user = await UserModel.getUserById({ id: userId })
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      const moodCreated = await MoodModel.create({
        userId,
        mood,
        notes,
        date
      })

      return res.status(201).json({
        _id: moodCreated._id,
        mood: moodCreated.mood,
        notes: moodCreated.notes,
        date: moodCreated.date.toDateString()
      })
    } catch (error) {
      console.error('Error adding mood:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  // OBTENER LOGS - CORREGIDO
  static async getLogs (req, res) {
    try {
      const userId = req.user.id
      const { from, to, limit } = req.query

      const user = await UserModel.getUserById({ id: userId })
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      const feelings = await MoodModel.getLogsByUser({
        userId,
        from,
        to,
        limit
      })

      const count = await MoodModel.countByUser({ userId })

      return res.json({
        _id: user._id,
        username: user.name,
        count,
        log: feelings.map(f => ({
          mood: f.mood,
          notes: f.notes,
          date: f.date.toDateString()
        }))
      })
    } catch (error) {
      console.error('Error getting logs:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
