import { NuxtModule, ModuleDependencyMeta } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface ModuleDependencies {
    ["@nuxtjs/prismic"]?: ModuleDependencyMeta<typeof import("@nuxtjs/prismic").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["sidebase-auth"]?: ModuleDependencyMeta<typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["auth-public-origin"]?: ModuleDependencyMeta<typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["auth-public-origin"]?: ModuleDependencyMeta<typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxt/devtools"]?: ModuleDependencyMeta<typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxt/telemetry"]?: ModuleDependencyMeta<typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
  }
  interface NuxtOptions {
    /**
     * Configuration for `@nuxtjs/prismic`
     */
    ["prismic"]: typeof import("@nuxtjs/prismic").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@sidebase/nuxt-auth`
     */
    ["auth"]: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin`
     */
    ["auth-public-origin"]: typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin`
     */
    ["auth-public-origin"]: typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxtjs/prismic`
     */
    ["prismic"]?: typeof import("@nuxtjs/prismic").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@sidebase/nuxt-auth`
     */
    ["auth"]?: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin`
     */
    ["auth-public-origin"]?: typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin`
     */
    ["auth-public-origin"]?: typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/prismic", Exclude<NuxtConfig["prismic"], boolean>] | ["@sidebase/nuxt-auth", Exclude<NuxtConfig["auth"], boolean>] | ["~/modules/auth-public-origin", Exclude<NuxtConfig["auth-public-origin"], boolean>] | ["C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin", Exclude<NuxtConfig["auth-public-origin"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface ModuleDependencies {
    ["@nuxtjs/prismic"]?: ModuleDependencyMeta<typeof import("@nuxtjs/prismic").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["sidebase-auth"]?: ModuleDependencyMeta<typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["auth-public-origin"]?: ModuleDependencyMeta<typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["auth-public-origin"]?: ModuleDependencyMeta<typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxt/devtools"]?: ModuleDependencyMeta<typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
    ["@nuxt/telemetry"]?: ModuleDependencyMeta<typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O | false : Record<string, unknown>> | false
  }
  interface NuxtOptions {
    /**
     * Configuration for `@nuxtjs/prismic`
     * @see https://www.npmjs.com/package/@nuxtjs/prismic
     */
    ["prismic"]: typeof import("@nuxtjs/prismic").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@sidebase/nuxt-auth`
     * @see https://www.npmjs.com/package/@sidebase/nuxt-auth
     */
    ["auth"]: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin`
     */
    ["auth-public-origin"]: typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin`
     * @see https://www.npmjs.com/package/C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin
     */
    ["auth-public-origin"]: typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? O | false : Record<string, any> | false
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxtjs/prismic`
     * @see https://www.npmjs.com/package/@nuxtjs/prismic
     */
    ["prismic"]?: typeof import("@nuxtjs/prismic").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@sidebase/nuxt-auth`
     * @see https://www.npmjs.com/package/@sidebase/nuxt-auth
     */
    ["auth"]?: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin`
     */
    ["auth-public-origin"]?: typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin`
     * @see https://www.npmjs.com/package/C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin
     */
    ["auth-public-origin"]?: typeof import("C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> | false : Record<string, any> | false
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/prismic", Exclude<NuxtConfig["prismic"], boolean>] | ["@sidebase/nuxt-auth", Exclude<NuxtConfig["auth"], boolean>] | ["~/modules/auth-public-origin", Exclude<NuxtConfig["auth-public-origin"], boolean>] | ["C:/Users/motoo/OneDrive/デスクトップ/HP_Nuxt3/modules/auth-public-origin", Exclude<NuxtConfig["auth-public-origin"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}