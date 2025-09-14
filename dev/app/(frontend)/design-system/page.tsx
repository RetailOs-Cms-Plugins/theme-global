import config from '@payload-config'
import { DesignSystemPage, ThemeLoader } from '@retailos-ai/cms-theme-global/client'
import { getTheme } from '@retailos-ai/cms-theme-global/rsc'
import { Suspense } from 'react'

// import { Example } from '../../../components/example'

export default async function Page() {
  const themeData = await getTheme({ config })
  return (
    <Suspense fallback={<ThemeLoader />}>
      <DesignSystemPage themeData={themeData.themeData} />
      {/* <Example /> */}
    </Suspense>
  )
}
