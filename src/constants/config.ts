export const STORE_OPENING_TIME = 9
export const STORE_CLOSING_TIME = 12
export const INTERVAL = 90 // in minutes

export const MAX_FILE_SIZE = 1024 * 1024 * 5 // 5MB

export const categories = ['all', 'breakfast', 'lunch', 'dinner'] as const

export const now = new Date() // Do not use this in mutated functions, e.g. setHours(0, 0, 0, 0)