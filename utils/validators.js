/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (Indonesian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone number
 */
export function isValidPhone(phone) {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/
  return phoneRegex.test(phone.replace(/\s|-/g, ''))
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with strength and errors
 */
export function validatePassword(password) {
  const errors = []
  let strength = 0
  
  if (password.length < 8) {
    errors.push('Password minimal 8 karakter')
  } else {
    strength += 1
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung huruf kecil')
  } else {
    strength += 1
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung huruf besar')
  } else {
    strength += 1
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password harus mengandung angka')
  } else {
    strength += 1
  }
  
  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.push('Password harus mengandung karakter khusus')
  } else {
    strength += 1
  }
  
  return {
    isValid: errors.length === 0,
    strength,
    errors,
  }
}

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @param {object} options - Validation options
 * @returns {object} Validation result
 */
export function validateFile(file, options = {}) {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  } = options
  
  const errors = []
  
  if (file.size > maxSize) {
    errors.push(`File terlalu besar. Maksimal ${maxSize / 1024 / 1024}MB`)
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push(`Tipe file tidak didukung. Gunakan: ${allowedTypes.join(', ')}`)
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate Indonesian student ID (NIM)
 * @param {string} nim - Student ID to validate
 * @returns {boolean} Is valid NIM
 */
export function isValidNIM(nim) {
  // Basic validation: should be numeric and 8-15 characters
  return /^[0-9]{8,15}$/.test(nim)
}


