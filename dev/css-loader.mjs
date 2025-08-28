// CSS/SCSS loader for Node.js
export async function resolve(specifier, context, defaultResolve) {
  if (specifier.endsWith('.css') || specifier.endsWith('.scss')) {
    return {
      url: new URL('data:text/javascript,export default {}').href,
      shortCircuit: true
    }
  }
  return defaultResolve(specifier, context)
}