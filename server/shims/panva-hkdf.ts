/**
 * next-auth/jwt は require("@panva/hkdf") + interopRequireDefault。
 * Nitro バンドル後に namespace import だと default が関数にならないため、CJS から明示 re-export。
 * Vercel では node_modules に @panva/hkdf が載らないため、ビルド時に CJS を取り込む（runtime require 禁止）。
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error — CJS; 解決は nuxt.config の @panva/hkdf-internal alias
import hkdfCjs from "@panva/hkdf-internal";

type HkdfFn = (
  digest: string,
  ikm: Uint8Array | string,
  salt: Uint8Array | string,
  info: Uint8Array | string,
  keylen: number,
) => Promise<Uint8Array>;

const hkdf =
  (typeof hkdfCjs === "function"
    ? hkdfCjs
    : (hkdfCjs as { default?: HkdfFn; hkdf?: HkdfFn }).default ??
      (hkdfCjs as { hkdf?: HkdfFn }).hkdf) as HkdfFn;

export default hkdf;
