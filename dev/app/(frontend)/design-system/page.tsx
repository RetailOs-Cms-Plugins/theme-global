import config from '@payload-config'
import { Suspense } from 'react'
import { DesignSystemPage, ThemeLoader } from 'theme-global/client'
import { getTheme } from 'theme-global/rsc'

export default async function Page() {
  const themeData = await getTheme({ config })
  return (
    <Suspense fallback={<ThemeLoader />}>
      <DesignSystemPage themeData={themeData.themeData} />
    </Suspense>
  )
}
