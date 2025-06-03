import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Find the actual project root by looking for common project markers
 */
function findProjectRoot(): string {
  let currentDir = process.cwd()
  const markers = ['package.json', 'next.config.js', 'next.config.mjs', 'tsconfig.json']

  // Look for project markers going up the directory tree
  while (currentDir !== path.dirname(currentDir)) {
    const hasMarker = markers.some((marker) => fs.existsSync(path.join(currentDir, marker)))

    if (hasMarker) {
      return currentDir
    }

    currentDir = path.dirname(currentDir)
  }

  // Fallback to current working directory
  return process.cwd()
}

export async function copyPluginFontsToProject(targetDir?: string): Promise<void> {
  try {
    // Smart project root detection
    const projectRoot = targetDir || findProjectRoot()
    const projectPublicDir = path.join(projectRoot, 'public/fonts')

    // Source fonts directory in the plugin
    const pluginFontsDir = path.resolve(__dirname, '../../assets/fonts')

    console.log('📁 Plugin fonts source:', pluginFontsDir)
    console.log('📁 Detected project root:', projectRoot)
    console.log('📁 Target directory:', projectPublicDir)

    // Check if source fonts exist
    if (!fs.existsSync(pluginFontsDir)) {
      console.warn('⚠️  Plugin fonts directory not found:', pluginFontsDir)
      return
    }

    // Verify we found a valid project (has public dir or can create it)
    const publicDir = path.join(projectRoot, 'public')
    if (!fs.existsSync(publicDir)) {
      console.log('📁 Creating public directory at:', publicDir)
    }

    // Ensure target directory exists
    await fs.promises.mkdir(projectPublicDir, { recursive: true })

    // Copy all font files
    await copyDirectory(pluginFontsDir, projectPublicDir)

    console.log('✅ Theme plugin fonts copied successfully!')

    // List copied files for verification
    await listCopiedFiles(projectPublicDir)
  } catch (error) {
    console.error('❌ Error copying theme plugin fonts:', error)
    throw error
  }
}

async function copyDirectory(src: string, dest: string): Promise<void> {
  await fs.promises.mkdir(dest, { recursive: true })

  const entries = await fs.promises.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath)
    } else {
      await fs.promises.copyFile(srcPath, destPath)
      console.log(`📄 Copied: ${entry.name}`)
    }
  }
}

async function listCopiedFiles(dir: string): Promise<void> {
  try {
    const files = await fs.promises.readdir(dir, { recursive: true })
    console.log('📋 Copied font files:')
    files.forEach((file) => console.log(`   - ${file}`))
  } catch (error) {
    console.log('Could not list copied files:', error)
  }
}

// Export a test function
export async function testFontCopying(): Promise<void> {
  console.log('🧪 Testing font copying process...')
  await copyPluginFontsToProject()
}
