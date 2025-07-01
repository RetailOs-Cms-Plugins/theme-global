'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'

export const LivePreviewListener = () => {
  const router = useRouter()

  return (
    <PayloadLivePreview
      refresh={router.refresh}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
    />
  )
}
