import { DesignSystemPage, getTheme, LivePreviewListener } from 'theme-global/client'

export default async function Page() {
  const themeData = await getTheme()
  return (
    <>
      <LivePreviewListener />
      <DesignSystemPage themeData={themeData.themeData} />
    </>
  )
}
