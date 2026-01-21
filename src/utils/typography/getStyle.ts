import type { Breakpoint, TypographyProps } from 'src/types/typography'

type GetCssVarsAndClassesProps = {
  breakpoint: Breakpoint
  tagType: TypographyProps['tagType']
  themeData: any
}

export const getCssVarsAndClasses = (props: GetCssVarsAndClassesProps) => {
  const { breakpoint, tagType, themeData } = props

  const elementConfig = themeData?.typography?.[tagType]

  const cssVariables = getCssVariables({
    breakpoint,
    elementConfig,
  })
  const cssClasses = getStyleClasses({
    breakpoint,
    elementConfig,
  })
  return { cssClasses, cssVariables }
}

const getCssVariables = ({
  breakpoint,
  elementConfig,
}: {
  breakpoint: Breakpoint
  elementConfig: any
}) => {
  const fontSize = elementConfig?.fontSize?.[breakpoint]
  const fontWeight = elementConfig?.fontWeight?.[breakpoint]
  const lineHeight = elementConfig?.lineHeight?.[breakpoint]

  const cssVariables = {
    // text
    ...(fontSize ? { '--font-size': fontSize } : {}),
    ...(fontWeight ? { '--font-weight': fontWeight } : {}),
    ...(lineHeight ? { '--line-height': lineHeight } : {}),
  } as React.CSSProperties

  return cssVariables
}

const getStyleClasses = ({
  breakpoint,
  elementConfig,
}: {
  breakpoint: Breakpoint
  elementConfig: any
}) => {
  const fontSize = elementConfig?.fontSize?.[breakpoint]
  const fontWeight = elementConfig?.fontWeight?.[breakpoint]
  const lineHeight = elementConfig?.lineHeight?.[breakpoint]

  const classes = [
    // text
    { 'text-[length:var(--font-size)]': fontSize },
    { 'font-[var(--font-weight)]': fontWeight },
    { 'line-height-[var(--line-height)]': lineHeight },
  ]

  return classes
}
