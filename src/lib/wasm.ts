import { dev } from '$app/environment'

import * as wasm from 'wasm/wasm_bg.wasm'
import * as wasmBindings from 'wasm/wasm_bg.js'

wasmBindings.__wbg_set_wasm(wasm)

// Ensure Wasm support
if (dev) {
  console.debug('Testing Wasm support')
}
if (!wasmBindings.test_wasm()) {
  throw new Error('Wasm not supported')
}

export default wasmBindings
export { wasm }

export function cleanup() {
  if (dev) {
    console.debug('Cleaning up Wasm')
  }

  wasmBindings.__wbg_set_wasm(null)
}
