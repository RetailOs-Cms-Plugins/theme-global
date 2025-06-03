// import { add, multiply, isValidHexColor } from './math'

// describe('Math utilities', () => {
//   describe('add', () => {
//     test('should add two positive numbers', () => {
//       expect(add(2, 3)).toBe(5)
//     })

//     test('should add negative numbers', () => {
//       expect(add(-2, -3)).toBe(-5)
//     })

//     test('should add zero', () => {
//       expect(add(5, 0)).toBe(5)
//     })
//   })

//   describe('multiply', () => {
//     test('should multiply two positive numbers', () => {
//       expect(multiply(3, 4)).toBe(12)
//     })

//     test('should multiply by zero', () => {
//       expect(multiply(5, 0)).toBe(0)
//     })

//     test('should multiply negative numbers', () => {
//       expect(multiply(-2, 3)).toBe(-6)
//     })
//   })

//   describe('isValidHexColor', () => {
//     test('should validate 6-digit hex colors', () => {
//       expect(isValidHexColor('#FF0000')).toBe(true)
//       expect(isValidHexColor('#ffffff')).toBe(true)
//       expect(isValidHexColor('#123ABC')).toBe(true)
//     })

//     test('should validate 3-digit hex colors', () => {
//       expect(isValidHexColor('#F00')).toBe(true)
//       expect(isValidHexColor('#fff')).toBe(true)
//       expect(isValidHexColor('#A1B')).toBe(true)
//     })

//     test('should reject invalid hex colors', () => {
//       expect(isValidHexColor('FF0000')).toBe(false)  // Missing #
//       expect(isValidHexColor('#GG0000')).toBe(false) // Invalid character
//       expect(isValidHexColor('#FF00')).toBe(false)   // Wrong length
//       expect(isValidHexColor('#FF00000')).toBe(false) // Too long
//       expect(isValidHexColor('')).toBe(false)         // Empty string
//     })
//   })
// })
