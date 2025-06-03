// import type { TextField } from 'payload'

// import colorPicker from './color-picker'

// describe('colorPicker field', () => {
//   it('should create a text field with color picker component', () => {
//     const field = colorPicker({
//       name: 'testColor',
//       defaultValue: '#FF0000',
//       label: 'Test Color',
//       path: 'test/path',
//     })

//     expect(field.name).toBe('testColor')
//     expect(field.type).toBe('text')
//     expect(field.label).toBe('Test Color')
//     expect(field.defaultValue).toBe('#FF0000')
//     expect(field.admin?.components?.Field?.path).toBe('test/path')
//   })

//   it('should use name as label when label is not provided', () => {
//     const field = colorPicker({
//       name: 'primaryColor',
//       path: 'test/path',
//     })

//     expect(field.label).toBe('primaryColor')
//   })

//   it('should validate hex colors correctly', () => {
//     const field = colorPicker({
//       name: 'testColor',
//       path: 'test/path',
//     }) as TextField

//     // Valid colors should pass
//     expect(field.validate?.('#FF0000')).toBe(true)
//     expect(field.validate?.('#fff')).toBe(true)
//     expect(field.validate?.(null)).toBe(true)
//     expect(field.validate?.(undefined)).toBe(true)

//     // Invalid colors should return error message
//     expect(field.validate?.('invalid')).toBe(
//       'Please enter a valid hex color (e.g., #FF0000 or #F00)',
//     )
//     expect(field.validate?.('FF0000')).toBe(
//       'Please enter a valid hex color (e.g., #FF0000 or #F00)',
//     )
//   })

//   it('should handle admin options correctly', () => {
//     const field = colorPicker({
//       name: 'testColor',
//       admin: {
//         description: 'Test description',
//         width: '50%',
//       },
//       path: 'test/path',
//     })

//     expect(field.admin?.description).toBe('Test description')
//     expect(field.admin?.width).toBe('50%')
//     expect(field.admin?.components?.Field?.path).toBe('test/path')
//   })
// })
