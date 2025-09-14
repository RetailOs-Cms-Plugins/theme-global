'use client'
import { useTheme } from '@retailos-ai/cms-theme-global/client'

export function Example() {
    const themeData = useTheme()
  return <div>Example {JSON.stringify(themeData)}</div>
}

export default Example