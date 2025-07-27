import config from '@payload-config'
import { Suspense } from 'react'
import { DesignSystemPage, getTheme } from 'theme-global/client'

export default async function Page() {
  const themeData = await getTheme({ config })
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DesignSystemPage themeData={themeData.themeData} />
    </Suspense>
  )
}
