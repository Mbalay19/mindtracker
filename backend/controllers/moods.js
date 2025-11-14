/* eslint-disable no-undef */
import { UserModel, MoodModel } from '../models/mongodb.js'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const { JsonWebTokenError } = pkg

export class MoodController {
  static async createUser (req, res) {
    try {
      const { username } = req.body

      if (!username) {
        return res.status(400).json({ message: 'Username is required' })
      }

      const user = await UserModel.create({ username })

      return res.status(201).json({
        username: user.username,
        _id: user._id
      })
    } catch (error) {
      console.error('Error getting users:')
      console.error(error)
      return res.status(500).json({ error: 'Internal server Error' })
    }
  }

  static async loginUser (req, res) {
    try {
      const { email, password } = req.body
      if (!email || !password) return res.status(400).json({ message: 'Email and password required ' })

      const user = await UserModel.findByEmail(email)
      if (!user) return res.status(400).json({ message: 'User not found!' })

      const equal = await bcrypt.compare(password, user.password)
      if (!equal) return res.status(400).json({ message: 'Incorrect Password, try again ' })

      const token = this.generateJWT(user)
      return res.json({ user, token })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Internal server error ' })
    }
  }

  static generateJWT (user) {
    return JsonWebTokenError.toString(
      { id: user._id, email: user.email, name: user.name, role: user.role || 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
  }

  static async addMood (req, res) {
    try {
      const { mood, notes, date } = req.body

      if (!mood || !notes || !date) {
        return res.status(400).json({
          error: 'All fields must be completed'
        })
      }

      // El usuario logueado ya está en req.user
      const userId = req.user._id

      const user = await UserModel.getUserById({ id: userId })
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const moodCreated = await MoodModel.create({
        userId,
        mood,
        notes,
        date
      })

      return res.status(201).json({
        _id: userId,
        mood: moodCreated.mood,
        notes: moodCreated.notes,
        date: moodCreated.date.toDateString()
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  static async getLogs (req, res) {
    try {
      // El cambio con la version anterior del modulo getLogs, el usuario ya esta logueado
      const userId = req.user._id //
      const { from, to, limit } = req.query

      const feelings = await MoodModel.getLogsByUser({
        userId,
        from,
        to,
        limit
      })

      const count = await MoodModel.countByUser({ userId })

      return res.json({
        _id: user._id,
        username: user.username,
        count,
        log: feelings.map(f => ({
          mood: f.mood,
          notes: f.notes,
          date: f.date.toDateString()
        }))
      })
    } catch (error) {
      console.error('Error getting logs')
      console.error(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
