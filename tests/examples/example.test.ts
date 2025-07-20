import { describe, expect, it, vi } from 'vitest'

import { themeGlobalPlugin } from '../../src/index'
import { sampleConfig, samplePluginOptions } from '../fixtures/index'

describe('Plugin Template Examples', () => {
  it('should export the plugin function', () => {
    expect(themeGlobalPlugin).toBeDefined()
    expect(typeof themeGlobalPlugin).toBe('function')
  })

  it('should return a function when called with options', () => {
    const plugin = themeGlobalPlugin(samplePluginOptions)
    expect(typeof plugin).toBe('function')
  })

  it('should return modified config when applied', () => {
    const plugin = themeGlobalPlugin(samplePluginOptions)
    const modifiedConfig = plugin(sampleConfig)

    expect(modifiedConfig).toBeDefined()
    expect(modifiedConfig.collections).toBeDefined()
  })

  it('should work with no options', () => {
    const plugin = themeGlobalPlugin({})
    const modifiedConfig = plugin(sampleConfig)

    expect(modifiedConfig).toEqual(sampleConfig)
  })

  it('should mock functions properly', () => {
    const mockFn = vi.fn()
    mockFn('test')

    expect(mockFn).toHaveBeenCalledWith('test')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
