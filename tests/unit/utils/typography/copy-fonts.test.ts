import fs from 'fs'
import { describe, expect, it, vi } from 'vitest'

import { copyPluginFontsToProject } from '../../../../src/utils/typography/copy-fonts.js'

// Mock dependencies
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    promises: {
      copyFile: vi.fn(),
      mkdir: vi.fn(),
      readdir: vi.fn(),
    },
  },
}))

vi.mock('path', async () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const actualPath = await vi.importActual<typeof import('path')>('path')
  return {
    ...actualPath,
    dirname: vi.fn((p) => p.split('/').slice(0, -1).join('/') || '/'),
    join: vi.fn((...args) => args.join('/')),
    resolve: vi.fn((...args) => args.join('/')),
  }
  }
)

vi.mock('url', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const actual = await importOriginal<typeof import('url')>()
  return {
    ...actual,
    fileURLToPath: vi.fn(() => '/plugin/src/utils/typography/copy-fonts.js'),
  }
})

const mockFs = fs as any

describe('Copy Fonts Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(process, 'cwd').mockReturnValue('/current/working/dir')
  })

  describe('copyPluginFontsToProject', () => {
    it('should copy fonts successfully when all conditions are met', async () => {
      // Setup mocks for successful scenario
      mockFs.existsSync
        .mockReturnValueOnce(true) // package.json exists (findProjectRoot)
        .mockReturnValueOnce(true) // plugin fonts dir exists

      mockFs.promises.readdir.mockResolvedValueOnce([
        { name: 'font.woff', isDirectory: () => false },
        { name: 'font.woff2', isDirectory: () => false },
      ])

      await copyPluginFontsToProject()

      expect(mockFs.promises.mkdir).toHaveBeenCalledWith('/current/working/dir/public/fonts', { recursive: true })
      expect(mockFs.promises.copyFile).toHaveBeenCalledTimes(2)
    })

    it('should use custom target directory when provided', async () => {
      const customTarget = '/custom/target'
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.promises.readdir.mockResolvedValue([])

      await copyPluginFontsToProject(customTarget)

      expect(mockFs.promises.mkdir).toHaveBeenCalledWith('/custom/target/public/fonts', { recursive: true })
    })

    it('should warn and return early when plugin fonts directory does not exist', async () => {
      mockFs.existsSync
        .mockReturnValueOnce(true) // package.json exists
        .mockReturnValueOnce(false) // plugin fonts dir does not exist

      await copyPluginFontsToProject()

      expect(mockFs.promises.mkdir).not.toHaveBeenCalled()
    })

    it('should handle errors gracefully', async () => {
      const testError = new Error('File system error')
      mockFs.existsSync.mockImplementation(() => {
        throw testError
      })

      await expect(copyPluginFontsToProject()).rejects.toThrow('File system error')
    })
  })
}) 