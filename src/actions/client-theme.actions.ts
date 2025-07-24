'use server'

import { getTheme } from './theme.actions'

export async function getClientTheme({ noCache = false } = {}) {
  const { themeData } = await getTheme({ noCache })
  return themeData
}
