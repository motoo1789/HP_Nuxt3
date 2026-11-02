/**
 * session はブラウザ fetch のため Vercel Functions ログに出ない。
 * 開いている URL の origin で /api/auth を叩く（Preview 別名 URL・誤 env 対策）。
 */
export default defineNuxtPlugin({
  name: "auth-origin",
  enforce: "pre",
  setup() {
    const config = useRuntimeConfig();
    config.public.auth.origin = window.location.origin;
  },
});
