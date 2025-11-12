import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const password = encodeURIComponent(process.env.MONGODB_PASSWORD)
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${password}@${process.env.MONGODB_CLUSTER}/?appName=Cluster0`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function connectUsers () {
  try {
    await client.connect()
    const database = client.db('mindtracker')
    return database.collection('users')
  } catch (error) {
    console.error('Error connecting to the Mindtracker Database')
    console.error(error)
    await client.close()
  }
}

async function connectFeelings () {
  try {
    await client.connect()
    const database = client.db('mindtracker')
    return database.collection('moods')
  } catch (error) {
    console.error('Error connecting to the Mindtracker Database')
    console.error(error)
    await client.close()
  }
}

export class UserModel {
  static async create ({ username }) {
    const db = await connectUsers()
    const user = {
      username,
      createdAt: new Date()
    }
    const { insertedId } = await db.insertOne(user)
    return {
      _id: insertedId,
      username
    }
  }

  static async getAll () {
    const db = await connectUsers()
    return db.find({}).toArray()
  }

  static async getUserById ({ id }) {
    const db = await connectUsers()
    return db.findOne({ _id: new ObjectId(id) })
  }
}

export class MoodModel {
  static async create ({ userId, mood, notes, date }) {
    const db = await connectFeelings()
    const moodValue = Number(mood)
    if (isNaN(moodValue) || moodValue < 0 || moodValue > 10) {
      throw new Error('The mood value must be between 0 and 10')
    }

    const newMood = {
      userId: new ObjectId(userId),
      mood: moodValue,
      notes,
      date: date ? new Date(date) : new Date()
    }

    const { insertedId } = await db.insertOne(newMood)
    return {
      _id: insertedId,
      ...newMood
    }
  }

  static async getLogsByUser ({ userId, from, to, limit }) {
    const db = await connectFeelings()
    const filter = { userId: new ObjectId(userId) }

    // filtros de fecha

    if (from || to) {
      filter.date = {}
      if (from) filter.date.$gte = new Date(from)
      if (to) filter.date.$lte = new Date(to)
    }

    let query = db.find(filter).sort({ date: -1 })

    if (limit) {
      query = query.limit(Number(limit))
    }

    return query.toArray()
  }

  static async countByUser ({ userId }) {
    const db = await connectFeelings()
    return db.countDocuments({ userId: new ObjectId(userId) })
  }
}
