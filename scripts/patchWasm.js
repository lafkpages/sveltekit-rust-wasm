#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises'

import getWasmPkg from './utils/getWasmPkg.js'

const { dir: wasmPkgDir } = getWasmPkg()

const path = `${wasmPkgDir}/package.json`

const wasmPackage = JSON.parse(await readFile(path, 'utf-8'))

// Apply patches
wasmPackage.type = 'module'

// Save changes
await writeFile(path, JSON.stringify(wasmPackage), 'utf-8')
