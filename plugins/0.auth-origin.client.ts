/** nuxt-auth より先に読み込む（0. プレフィックス）。相対 /api/auth の保険。 */
export default defineNuxtPlugin({
  name: "auth-origin-client",
  enforce: "pre",
  setup() {
    const config = useRuntimeConfig();
    config.public.auth.baseURL = "/api/auth";
  },
});
