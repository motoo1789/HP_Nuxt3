/**
 * next-auth/jwt は require("@panva/hkdf") + interopRequireDefault。
 * Nitro バンドル後に namespace import だと default が関数にならないため、CJS から明示 re-export。
 */
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

/** dev (.nuxt/dev) / prod (.output) どちらでもプロジェクト直下の node_modules を指す */
function resolveProjectRoot(): string {
  const candidates = [
    process.cwd(),
    resolve(fileURLToPath(import.meta.url), "../../.."),
  ];
  for (const root of candidates) {
    try {
      require.resolve(resolve(root, "node_modules/@panva/hkdf/package.json"));
      return root;
    } catch {
      // try next
    }
  }
  return process.cwd();
}

const hkdfCjs = require(
  resolve(
    resolveProjectRoot(),
    "node_modules/@panva/hkdf/dist/node/cjs/index.js",
  ),
);

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
