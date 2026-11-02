/**
 * Vercel Preview は git-* URL と *-hash* URL が同じデプロイを指すが、
 * ビルド時 origin は VERCEL_URL 1 つに固定される → 別 alias だと CORS / auth 500。
 * ブラウザでは常に今開いている origin で /api/auth を叩く。
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  config.public.auth.origin = window.location.origin;
});
