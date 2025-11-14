import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
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

let usersCollection
let moodsCollection

export async function mongol () {
  try {
    await client.connect()
    const db = client.db('mindtracker')
    usersCollection = db.collection('users')
    moodsCollection = db.collection('moods')
    console.log('Conexión a MongoDB establecida')
  } catch (error) {
    console.error('Error conectando a la DB:', error)
  }
}

mongol()

export class UserModel {
  static async create ({ name, lastName, telephone, email, password }) {
    const hashed = await bcrypt.hash(password, 10)

    const user = {
      name,
      lastName,
      telephone,
      email,
      password: hashed,
      createdAt: new Date(),
      provider: 'local'
    }
    const { insertedId } = await usersCollection.insertOne(user)
    return {
      _id: insertedId,
      ...user
    }
  }

  static async findByEmail (email) {
    return usersCollection.findOne({ email })
  }

  static async findByGoogleId (googleId) {
    return usersCollection.findOne({ googleId })
  }

  static async createGoogleUser (profile) {
    const newUser = {
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
      provider: 'google',
      createdAt: new Date()
    }

    const { insertedId } = await usersCollection.insertOne(newUser)
    return {
      _id: insertedId,
      ...newUser
    }
  }

  static async getAll () {
    return usersCollection.find({}).toArray()
  }

  static async getUserById ({ id }) {
    return usersCollection.findOne({ _id: new ObjectId(id) })
  }
}

export class MoodModel {
  static async create ({
    userId,
    mood,
    depositionalRhythm,
    libido,
    sportHours,
    healthyFood,
    junkFood,
    pains,
    sleepHours,
    notes,
    date
  }) {
    // Validaciones
    const moodValue = Number(mood)
    if (isNaN(moodValue) || moodValue < 0 || moodValue > 10) {
      throw new Error('Mood must be between 0 and 10')
    }

    const libidoValue = Number(libido)
    if (isNaN(libidoValue) || libidoValue < 1 || libidoValue > 10) {
      throw new Error('Libido must be between 1 and 10')
    }

    const sportHoursValue = Number(sportHours)
    if (isNaN(sportHoursValue) || sportHoursValue < 0 || sportHoursValue > 24) {
      throw new Error('Sport hours must be between 0 and 24')
    }

    // Opciones permitidas
    const rhythmOptions = ['Excellent', 'Good', 'Normal', 'Bad', 'Very Bad']
    const foodOptions = ['Excellent', 'Good', 'Normal', 'Bad', 'Very Bad']
    const junkOptions = ['None', 'Little', 'Overeaten']
    const sleepOptions = ['8 hours', 'More than 8 hours', 'Less than 8 hours']
    const painOptions = ['None', 'Head', 'Neck', 'Back', 'Legs', 'Arms', 'Abdomen']

    if (!rhythmOptions.includes(depositionalRhythm)) throw new Error('Invalid depositional rhythm')
    if (!foodOptions.includes(healthyFood)) throw new Error('Invalid healthy food value')
    if (!junkOptions.includes(junkFood)) throw new Error('Invalid junk food value')
    if (!sleepOptions.includes(sleepHours)) throw new Error('Invalid sleep hours value')
    if (!Array.isArray(pains) || !pains.every(p => painOptions.includes(p))) {
      throw new Error('Invalid pains selection')
    }

    const newMood = {
      userId: new ObjectId(userId),
      mood: moodValue,
      depositionalRhythm,
      libido: libidoValue,
      sportHours: sportHoursValue,
      healthyFood,
      junkFood,
      pains,
      sleepHours,
      notes,
      date: date ? new Date(date) : new Date()
    }

    const { insertedId } = await moodsCollection.insertOne(newMood)
    return {
      _id: insertedId,
      ...newMood
    }
  }

  static async getLogsByUser ({ userId, from, to, limit }) {
    const filter = { userId: new ObjectId(userId) }

    // filtros de fecha

    if (from || to) {
      filter.date = {}
      if (from) filter.date.$gte = new Date(from)
      if (to) filter.date.$lte = new Date(to)
    }

    let query = moodsCollection.find(filter).sort({ date: -1 })

    if (limit) {
      query = query.limit(Number(limit))
    }

    return query.toArray()
  }

  static async countByUser ({ userId }) {
    return moodsCollection.countDocuments({ userId: new ObjectId(userId) })
  }
}
