/**
 *  Vite Plugin for fast creating SVG sprites.
 * https://github.com/anncwb/vite-plugin-svg-icons
 */

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export function configSvgIconsPlugin() {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [ path.resolve(process.cwd(), 'src/assets/icons') ],
    symbolId: 'icon-[dir]-[name]',
    inject: 'body-last',
    /**
     * svgo configuration, used to compress svg
     * @default：true
     */
    //  svgoOptions?: boolean | OptimizeOptions;

    customDomId: '__svg__icons__dom__'
  })
  return svgIconsPlugin
}
