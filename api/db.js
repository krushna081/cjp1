const mongoose = require('mongoose')

let cachedDb = null

function encodeMongoPassword(uri) {
  try {
    const url = new URL(uri)
    const username = url.username
    const password = url.password
    
    if (password && password.includes('%')) {
      return uri
    }
    
    const encodedPassword = encodeURIComponent(password)
    return uri.replace(`${username}:${password}`, `${username}:${encodedPassword}`)
  } catch {
    return uri
  }
}

async function connectDB() {
  if (cachedDb && cachedDb.readyState === 1) {
    return cachedDb
  }

  const MONGODB_URI = process.env.MONGODB_URI
  
  if (!MONGODB_URI) {
    console.log('MongoDB URI not configured')
    return null
  }

  try {
    const encodedUri = encodeMongoPassword(MONGODB_URI)
    
    cachedDb = await mongoose.connect(encodedUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    })
    
    console.log('MongoDB connected')
    return cachedDb
  } catch (err) {
    console.error('MongoDB error:', err.message)
    cachedDb = null
    return null
  }
}

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  village: { type: String, default: '' },
  twitterHandle: { type: String, default: '' },
  chronicallyOnline: { type: String, required: true },
  lazy: { type: String, required: true },
  cockroach: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
}, { timestamps: true })

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: String,
  location: String,
  description: String,
  meetingType: { type: String, enum: ['rally', 'meeting', 'twitter_space', 'volunteer'], default: 'meeting' },
  joinLink: String,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true })

const Member = mongoose.models.Member || mongoose.model('Member', memberSchema)
const Meeting = mongoose.models.Meeting || mongoose.model('Meeting', meetingSchema)

module.exports = { connectDB, Member, Meeting }