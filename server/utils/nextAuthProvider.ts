/** next-auth provider modules の CJS / ESM 差を吸収 */
export function callNextAuthProvider(
  providerModule: unknown,
  options: Record<string, unknown>,
): unknown {
  const moduleWithDefault = providerModule as { default?: unknown };
  const nested = moduleWithDefault.default as
    | { default?: (opts: Record<string, unknown>) => unknown }
    | ((opts: Record<string, unknown>) => unknown)
    | undefined;

  if (typeof nested === "function") {
    return nested(options);
  }

  if (
    nested &&
    typeof nested === "object" &&
    typeof nested.default === "function"
  ) {
    return nested.default(options);
  }

  throw new TypeError("next-auth provider module is not callable");
}
