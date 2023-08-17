import pkg from '../../package.json' assert { type: 'json' }

export default function getWasmPkg() {
  const [name, version] = Object.entries(pkg.optionalDependencies).find(
    ([, version]) =>
      version.startsWith('file:') && version.toLowerCase().includes('wasm') && /pkg$/.test(version)
  ) || [null, null]

  if (!name || !version) {
    throw new Error('[getWasmPkg] Could not find Wasm package')
  }

  const dir = version.replace(/^file:/, '')

  return {
    name,
    version,
    dir
  }
}
