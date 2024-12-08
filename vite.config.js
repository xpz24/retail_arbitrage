import browserslist from 'browserslist'
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist'

const targets = resolveToEsbuildTarget(browserslist(), { printUnknownTargets: false })

/** @type {import('vite').UserConfig} */
export default {
  build: {
    target: targets
  }
}
