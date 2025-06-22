'use server'

import { getTheme } from './theme.actions'

export async function getClientTheme() {
  const { themeData } = await getTheme()
  return themeData
}
