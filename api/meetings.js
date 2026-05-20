const { connectDB, Meeting } = require('./db')

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

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    await connectDB()
    
    const meetings = await Meeting.find({ date: { $gte: new Date() } }).sort({ date: 1 }).limit(20)
    
    if (meetings.length === 0) {
      return res.status(200).json({ success: true, data: defaultMeetings })
    }
    
    return res.status(200).json({ success: true, data: meetings })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}