import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV()

export const setCache = (key: string, value: unknown, ttlMs: number = 10 * 6 * 1000) => {
  storage.set(key.trim().toLocaleLowerCase(), JSON.stringify({
    value,
    expiresAt: Date.now() + ttlMs
  }))
}

export const getCache = <T>(key: string): T | null => {
  const json = storage.getString(key)
  if (!json) return null;

  const entry = JSON.parse(json)
  if (Date.now() > entry.expiresAt) {
    storage.remove(key)
    return null;
  }
  return entry.value;
}

export const clearCache = (key: string) => {
  storage.remove(key)
}