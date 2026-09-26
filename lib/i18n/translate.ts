import type { Dictionary } from "./dictionaries";

export function translate(dict: Dictionary, key: string): string {
  const parts = key.split(".");
  let value: unknown = dict;
  for (const part of parts) {
    if (typeof value !== "object" || value === null || !(part in value)) {
      return key;
    }
    value = (value as Record<string, unknown>)[part];
  }
  return typeof value === "string" ? value : key;
}
