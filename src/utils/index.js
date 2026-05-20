export const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { 
    day: '2-digit', 
    month: 'short',
    year: 'numeric'
  })
}

export const formatDateShort = (date) => {
  const d = new Date(date)
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  }
}

export const getInitials = (name) => {
  if (!name) return 'AD'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10
}

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))