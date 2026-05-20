const { connectDB, Member, Meeting } = require('./db')

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    await connectDB()
    
    const totalMembers = await Member.countDocuments()
    
    const stateStats = await Member.aggregate([
      { $group: { _id: '$state', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    
    const statesWithMembers = stateStats.length
    const totalMeetings = await Meeting.countDocuments()
    const activeVolunteers = Math.floor(totalMembers * 0.1)
    const nationalReach = Math.round((statesWithMembers / 28) * 100)
    
    const topStates = stateStats.slice(0, 6).map(s => ({
      state: s._id,
      count: s.count,
      percentage: totalMembers > 0 ? Math.round((s.count / totalMembers) * 100) : 0
    }))
    
    return res.status(200).json({
      totalMembers,
      totalMeetings,
      activeVolunteers,
      statesWithMembers,
      totalStates: 28,
      nationalReach,
      topStates,
      stateStats,
    })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}