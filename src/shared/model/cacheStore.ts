import { defineStore } from 'pinia'
import { ref } from 'vue'

interface CacheItem {
  data: unknown
  timestamp: number
  ttl: number
}

interface CacheStore {
  [key: string]: CacheItem
}

export const useCacheStore = defineStore('cache', () => {
  const cache = ref<CacheStore>({})
  const defaultTTL = 5 * 60 * 1000

  const createCacheKey = (url: string, headers?: Record<string, string>): string => {
    const headersString = headers ? JSON.stringify(headers) : ''
    return `${url}${headersString}`
  }

  const isExpired = (cacheItem: CacheItem): boolean => {
    const age = Date.now() - cacheItem.timestamp
    return age > cacheItem.ttl
  }

  const get = <T>(url: string, headers?: Record<string, string>): T | null => {
    const key = createCacheKey(url, headers)
    const cacheItem = cache.value[key]

    if (!cacheItem) {
      return null
    }

    if (isExpired(cacheItem)) {
      delete cache.value[key]
      return null
    }

    return cacheItem.data as T
  }

  const set = <T>(url: string, data: T, ttl: number = defaultTTL, headers?: Record<string, string>): void => {
    const key = createCacheKey(url, headers)
    cache.value[key] = {
      data,
      timestamp: Date.now(),
      ttl
    }
  }


  return {
    cache,
    get,
    set
  }
}) 