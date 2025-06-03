import chroma from 'chroma-js'
export function generateColorScale(
  baseColor: string,
  variableName: string,
): Record<string, string> {
  const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  const scale = chroma.scale(['white', baseColor, 'black']).mode('lab').colors(weights.length)

  return weights.reduce((acc: Record<string, string>, weight: number, index: number) => {
    acc[`--color-${variableName}-${weight}`] = scale[index]
    return acc
  }, {})
}
