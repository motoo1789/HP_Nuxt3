import { defineNuxtModule } from "@nuxt/kit";

/** クライアントは相対 /api/auth（Preview の git-* / hash URL 両対応）。サーバー origin は auth.origin のまま。 */
export default defineNuxtModule({
  meta: { name: "auth-public-origin" },
  setup(_options, nuxt) {
    nuxt.hook("modules:done", () => {
      const publicAuth = nuxt.options.runtimeConfig.public?.auth as
        | { baseURL?: string }
        | undefined;
      if (publicAuth) {
        publicAuth.baseURL = "/api/auth";
      }
    });
  },
});
