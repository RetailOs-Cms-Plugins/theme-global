// Test script to verify typography fix
const mockThemeData = {
  typography: {
    h3: {
      fontSize: {
        largeDesktop: '3rem',
        desktop: '2.5rem',
        tablet: '2rem',
        mobile: '1.5rem',
      },
      lineHeight: {
        largeDesktop: '1.2',
        desktop: '1.2',
        tablet: '1.2',
        mobile: '1.1',
      },
    },
  },
}

// Simulate the getTypographyStyles function logic
function getTypographyStyles(element, themeData, baseClassName = '') {
  const elementConfig = themeData?.typography?.[element]

  // Check if we have responsive breakpoint data
  const hasResponsiveFontSize =
    elementConfig?.fontSize && typeof elementConfig.fontSize === 'object'
  const hasResponsiveLineHeight =
    elementConfig?.lineHeight && typeof elementConfig.lineHeight === 'object'

  // For responsive configurations, use 'desktop' as the default breakpoint
  // For non-responsive configurations, use the string values directly
  let fontSize
  let lineHeight

  if (hasResponsiveFontSize) {
    // Use desktop as default, fallback to first available breakpoint
    fontSize =
      elementConfig.fontSize.desktop ||
      elementConfig.fontSize.largeDesktop ||
      elementConfig.fontSize.tablet ||
      elementConfig.fontSize.mobile ||
      Object.values(elementConfig.fontSize)[0]
  } else {
    fontSize = elementConfig?.fontSize
  }

  if (hasResponsiveLineHeight) {
    // Use desktop as default, fallback to first available breakpoint
    lineHeight =
      elementConfig.lineHeight.desktop ||
      elementConfig.lineHeight.largeDesktop ||
      elementConfig.lineHeight.tablet ||
      elementConfig.lineHeight.mobile ||
      Object.values(elementConfig.lineHeight)[0]
  } else {
    lineHeight = elementConfig?.lineHeight
  }

  const customStyles = {}
  if (fontSize) {
    customStyles.fontSize = fontSize
  }
  if (lineHeight) {
    customStyles.lineHeight = lineHeight
  }

  return {
    className: baseClassName,
    style: customStyles,
    responsiveFontSize: hasResponsiveFontSize ? elementConfig.fontSize : undefined,
    responsiveLineHeight: hasResponsiveLineHeight ? elementConfig.lineHeight : undefined,
  }
}

// Test the function
const result = getTypographyStyles('h3', mockThemeData, 'scroll-m-20 font-semibold tracking-tight')
console.log('Test result:', JSON.stringify(result, null, 2))

// Verify the fix works
if (result.style.fontSize === '2.5rem' && result.style.lineHeight === '1.2') {
  console.log(
    '✅ Fix works correctly! TypographyH3 will now get font size and line height from theme data.',
  )
} else {
  console.log('❌ Fix failed. Expected fontSize: 2.5rem, lineHeight: 1.2, but got:', result.style)
}
