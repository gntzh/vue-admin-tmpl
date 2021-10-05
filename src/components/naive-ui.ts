import { h } from 'vue'
import { NIcon } from 'naive-ui'

export function renderIcon(icon: any, props: any = null) {
  return h(NIcon, props, { default: () => h(icon) })
}
