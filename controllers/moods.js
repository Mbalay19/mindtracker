import { UserModel, MoodModel } from '../models/mongodb.js'

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

  static async addMood (req, res) {
    try {
      const { _id } = req.params
      const { mood, notes, date } = req.body

      if (!mood || !notes || !date) {
        return res.status(400).json({
          error: 'All fields must be completed'
        })
      }

      const user = await UserModel.getUserById({ id: _id })
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const moods = await MoodModel.create({
        userId: _id,
        mood,
        notes,
        date
      })

      return res.status(201).json({
        _id: user._id,
        mood: moods.mood,
        notes: moods.notes,
        date: moods.date.toDateString()
      })
    } catch (error) {
      console.error('Error creating user')
      console.error(error)
      return res.status(500).json({ error: 'Internal server error ' })
    }
  }

  static async getLogs (req, res) {
    try {
      const { _id } = req.params
      const { from, to, limit } = req.query

      // verificar si user exists

      const user = await UserModel.getUserById({ id: _id })
      if (!user) {
        return res.status(404).json({ error: 'User not Found! ' })
      }

      const feelings = await MoodModel.getLogsByUser({
        userId: _id,
        from,
        to,
        limit
      })

      const count = await MoodModel.countByUser({ userId: _id })

      return res.json({
        _id: user._id,
        username: user.username,
        count,
        log: feelings.map(feeling => ({
          mood: feeling.mood,
          notes: feeling.notes,
          date: feeling.date.toDateString()
        }))
      })
    } catch (error) {
      console.error('Error getting logs')
      console.error(error)
      return res.status(500).json({ error: 'Internal server error ' })
    }
  }
}
