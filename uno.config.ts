import { defineConfig, presetAttributify } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [ presetUno(), presetAttributify(), presetRemToPx() ]
})