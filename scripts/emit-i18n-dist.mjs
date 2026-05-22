/**
 * Rewrite dist/i18n/*.js from source JSON so each locale is a single
 * `export default` — avoids Rollup merging minified top-level bindings (e.g. `h`)
 * when consumers bundle vue-cal's import.meta.glob i18n chunks together.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from '../package.json' with { type: 'json' }

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const i18nSrc = join(root, 'src/vue-cal/i18n')
const i18nDist = join(root, 'dist/i18n')
const year = new Date().getFullYear()
const banner = `/**
  * ${pkg.name} v${pkg.version}
  * (c) 2024-${year} ${pkg.author}
  * @license MIT
  */\n`

for (const name of readdirSync(i18nSrc).filter(f => f.endsWith('.json'))) {
  const locale = name.replace(/\.json$/, '')
  const data = JSON.parse(readFileSync(join(i18nSrc, name), 'utf8'))
  writeFileSync(
    join(i18nDist, `${locale}.js`),
    `${banner}export default ${JSON.stringify(data)}\n`
  )
}
