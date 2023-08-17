#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises'

import ts from 'typescript'

import { format } from 'prettier'

import getWasmPkg from './utils/getWasmPkg.js'

// Prettier config
import prettierConfig from '../.prettierrc.json' assert { type: 'json' }

const { name: wasmPkgName, dir: wasmPkgDir } = getWasmPkg()

const wasmBindingTypes = await readFile(`${wasmPkgDir}/wasm.d.ts`, 'utf-8')
const wasmTypes = await readFile(`${wasmPkgDir}/wasm_bg.wasm.d.ts`, 'utf-8')

const tsProgram = ts.createProgram({
  rootNames: ['./src/lib/wasm.ts', `${wasmPkgDir}/wasm_bg.js`],
  options: {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true
  }
})

let generatedTypes = `
declare module '${wasmPkgName}/wasm.js' {
${wasmBindingTypes.trim()}
}

declare module '${wasmPkgName}/wasm_bg.wasm' {
${wasmTypes.trim()}
}
`

let tsEmitsDone = 0
tsProgram.emit(undefined, async (fileName, wasmLibTypes) => {
  tsEmitsDone++

  console.debug('[TSC] Emitting', fileName)

  generatedTypes = `
		declare module "${fileName.endsWith('wasm_bg.d.ts') ? `${wasmPkgName}/wasm_bg.js` : '$lib/wasm'}" {
			${wasmLibTypes}
		}

		${generatedTypes}
	`

  if (tsEmitsDone >= 2) {
    // Prettify the generated types
    const prettifiedTypes = await format(generatedTypes, {
      parser: 'typescript',
      ...prettierConfig
    })

    // Write the types to the file
    await writeFile('./src/wasm.d.ts', prettifiedTypes)
  }
})
