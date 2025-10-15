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

async function shouldCopyFonts(targetDir: string, sourceDir: string): Promise<boolean> {
  try {
    // Check if target directory exists
    if (!fs.existsSync(targetDir)) {
      return true
    }

    // Check if all source files exist in target
    const sourceFiles = await getAllFiles(sourceDir)
    for (const file of sourceFiles) {
      const relativePath = path.relative(sourceDir, file)
      const targetFile = path.join(targetDir, relativePath)
      
      if (!fs.existsSync(targetFile)) {
        return true
      }
      
      // Optional: Check if files are different
      const sourceStats = await fs.promises.stat(file)
      const targetStats = await fs.promises.stat(targetFile)
      
      if (sourceStats.size !== targetStats.size) {
        return true
      }
    }
    
    return false
  } catch (error) {
    return true
  }
}

async function getAllFiles(dir: string): Promise<string[]> {
  const files: string[] = []
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)))
    } else {
      files.push(fullPath)
    }
  }
  
  return files
}

export async function copyPluginFontsToProject(targetDir?: string): Promise<void> {
  try {
    const projectRoot = targetDir || findProjectRoot()
    const projectPublicDir = path.join(projectRoot, 'public/fonts')
    const pluginFontsDir = path.resolve(__dirname, '../../assets/fonts')

    if (!fs.existsSync(pluginFontsDir)) {
      console.warn('⚠️  Plugin fonts directory not found:', pluginFontsDir)
      return
    }

    const needsCopy = await shouldCopyFonts(projectPublicDir, pluginFontsDir)
    if (!needsCopy) {
      console.log('✅ Theme plugin fonts already exist, skipping copy')
      return
    }

    const publicDir = path.join(projectRoot, 'public')
    if (!fs.existsSync(publicDir)) {
      console.log('📁 Creating public directory at:', publicDir)
    }

    await fs.promises.mkdir(projectPublicDir, { recursive: true })
    await copyDirectory(pluginFontsDir, projectPublicDir)

    console.log('✅ Theme plugin fonts copied successfully!')
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
  } catch (error) {
    console.error('Could not list copied files:', error)
  }
}
