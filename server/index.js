import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err.message))
} else {
  console.log('MongoDB URI not configured')
}

const TOTAL_INDIAN_STATES = 28

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

app.post('/api/members', async (req, res) => {
  try {
    const member = new Member(req.body)
    await member.save()
    
    res.status(201).json({ 
      success: true, 
      message: 'Member registered successfully',
      data: member 
    })
  } catch (error) {
    console.error('Error creating member:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error registering member',
      error: error.message 
    })
  }
})

app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ joinedAt: -1 }).limit(100)
    res.json({ success: true, data: members })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching members', error: error.message })
  }
})

app.get('/api/stats', async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments()
    
    const stateStats = await Member.aggregate([
      { $group: { _id: '$state', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    
    const statesWithMembers = stateStats.length
    
    const totalMeetings = await Meeting.countDocuments()
    const activeVolunteers = Math.floor(totalMembers * 0.1)
    const nationalReach = Math.round((statesWithMembers / TOTAL_INDIAN_STATES) * 100)
    
    const topStates = stateStats.slice(0, 6).map(s => ({
      state: s._id,
      count: s.count,
      percentage: totalMembers > 0 ? Math.round((s.count / totalMembers) * 100) : 0
    }))
    
    res.json({
      totalMembers,
      totalMeetings,
      activeVolunteers,
      statesWithMembers,
      totalStates: TOTAL_INDIAN_STATES,
      nationalReach,
      topStates,
      stateStats,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching stats', error: error.message })
  }
})

app.get('/api/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find({ date: { $gte: new Date() } }).sort({ date: 1 }).limit(20)
    if (meetings.length === 0) {
      const defaultMeetings = [
        {
          title: 'CJP Town Hall: The Unemployed Speak',
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          time: '8:00 PM IST',
          location: 'Twitter Spaces',
          description: 'An open forum for all members to discuss their concerns.',
          meetingType: 'twitter_space',
          joinLink: '#',
        },
        {
          title: 'Rally: Jobs for Everyone, Stairs for No One',
          date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          time: '10:00 AM IST',
          location: 'Town Hall Square, Mumbai',
          description: 'A peaceful protest demanding accountability.',
          meetingType: 'rally',
          joinLink: '#',
        },
      ]
      return res.json({ success: true, data: defaultMeetings })
    }
    res.json({ success: true, data: meetings })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching meetings', error: error.message })
  }
})

app.post('/api/meetings', async (req, res) => {
  try {
    const meeting = new Meeting(req.body)
    await meeting.save()
    res.status(201).json({ success: true, data: meeting })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating meeting', error: error.message })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/', (req, res) => {
  res.json({ message: 'CJP API Running', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})