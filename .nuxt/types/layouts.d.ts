import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "error"
declare module "C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}