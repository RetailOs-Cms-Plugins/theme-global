import type { Config, GlobalConfig } from 'payload'

import { themeGlobal } from './globals/theme'
import { copyPluginFontsToProject } from './utils/typography/copy-fonts'

export interface ThemeGlobalPluginOptions extends Omit<GlobalConfig, 'fields' | 'slug'> {
  /**
   * Default theme values
   */
  defaultTheme?: {
    primaryColor?: string
    secondaryColor?: string
    typography?: {
      fontFamily?: string
      fontSize?: string
    }
  }

  /**
   * Enable or disable plugin
   * @default true
   */
  enabled?: boolean

  /**
   * Customize the global slug
   * @default 'theme-config'
   */
  globalSlug?: string
}

export const themeGlobalPlugin =
  (pluginOptions: ThemeGlobalPluginOptions) =>
  (incomingConfig: Config): Config => {
    const config = {
      ...incomingConfig,
      access: pluginOptions.access,
      globals: [{ ...themeGlobal, slug: pluginOptions.globalSlug || 'theme-config' }],
    }

    if (pluginOptions.enabled === false) {
      return incomingConfig
    }

    // Extend onInit if needed
    config.onInit = async (payload) => {
      if (incomingConfig.onInit) {
        await incomingConfig.onInit(payload)
      }

      // Auto-copy fonts during initialization
      await copyPluginFontsToProject()

      // Initialize theme defaults
      payload.logger.info('Theme Global Plugin initialized')
    }

    return config
  }
