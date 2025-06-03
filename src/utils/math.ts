/**
 * Add two numbers together
 */
export const add = (a: number, b: number): number => {
  return a + b
}

/**
 * Multiply two numbers
 */
export const multiply = (a: number, b: number): number => {
  return a * b
}

/**
 * Check if a string is a valid hex color
 */
export const isValidHexColor = (color: string): boolean => {
  return /^#(?:[A-F0-9]{6}|[A-F0-9]{3})$/i.test(color)
} 