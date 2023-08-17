#!/usr/bin/env node

import getWasmPkg from './utils/getWasmPkg.js'

import { spawn } from './utils/exec.js'
import { copyFile, rm, constants } from 'fs/promises'

/** @type {string | null} */ let wasmPkgName = null
/** @type {string | null} */ let wasmPkgDir = null

const offline = process.argv.includes('--offline') ? '--offline' : ''

/**
 * Wether to force a fresh installation, by first
 * removing the WebAssembly dependency from
 * `node_modules`.
 */
const force = process.argv.includes('--force')

console.log('\n[SETUP] Force:', force, '\n')

// Install non-optional dependencies
await spawn('pnpm', ['i', '--no-optional', offline])

if (force) {
  ;({ name: wasmPkgName, dir: wasmPkgDir } = getWasmPkg())

  // Remove WebAssembly package from Node modules
  await rm(`./node_modules/${wasmPkgName}`, {
    recursive: true,
    force: true
  })

  // Remove generated WebAssembly files
  await rm(wasmPkgDir, {
    recursive: true,
    force: true
  })
}

// Build WebAssembly
await spawn('pnpm', ['build:wasm'])

// Install missing optional dependencies
await spawn('pnpm', ['i', offline])

// If no .env exists, copy the example
try {
  await copyFile('.env.example', '.env', constants.COPYFILE_EXCL)
} catch (e) {
  if (e.code != 'EEXIST') {
    throw e
  }
}
