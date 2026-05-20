const { connectDB, Member } = require('./db')

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    await connectDB()
    
    if (req.method === 'GET') {
      const members = await Member.find().sort({ joinedAt: -1 }).limit(100)
      return res.status(200).json({ success: true, data: members })
    }
    
    if (req.method === 'POST') {
      const member = new Member(req.body)
      await member.save()
      return res.status(201).json({ 
        success: true, 
        message: 'Member registered successfully',
        data: member 
      })
    }
    
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}