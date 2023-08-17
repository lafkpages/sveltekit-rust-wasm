import adapterAuto from '@sveltejs/adapter-auto'
import adapterNode from '@sveltejs/adapter-node'

import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess({
      postcss: true
    })
  ],

  kit: {
    adapter:
      process.env.ADAPTER == 'node' || process.env.REPLIT_ENVIRONMENT
        ? adapterNode()
        : adapterAuto()
  }
}

export default config
