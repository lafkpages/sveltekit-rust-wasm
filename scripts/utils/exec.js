import { exec as _exec, spawn as _spawn } from 'child_process'
import { promisify } from 'util'

export const exec = promisify(_exec)

/**
 * @type {(...args: [...Parameters<_spawn>, {
 *   event?: 'close' | 'exit'
 * }]) => (Promise<{
 *   code: number | null,
 *   signal: NodeJS.Signals | null
 * }> & {
 *   process: ReturnType<_spawn>
 * })}
 */
export function spawn(...args) {
  const opts = args.pop()

  /** @type {import('child_process').ChildProcess} */
  const process = _spawn(...args)

  const promise = new Promise((resolve, reject) => {
    process.on(opts.event || 'close', (code, signal) => {
      resolve({ code, signal })
    })
    process.on('error', reject)
  })

  promise.process = process

  return promise
}
