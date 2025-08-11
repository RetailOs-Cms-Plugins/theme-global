import type { ThemeConfig } from '../../types'

import DesignSystemComponent  from '../design-system'
import { LivePreviewListener } from '../live-preview-listener'

export default function DesignSystemPage( {themeData}: {themeData: ThemeConfig} ) {
  return (
    <>
      <LivePreviewListener />
      <DesignSystemComponent themeData={themeData} />
    </>
  )
}
