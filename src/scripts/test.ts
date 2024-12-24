export class CacheService {
  #store = new Map<string, unknown>()

  has(key: string) {
    return this.#store.has(key)
  }

  get(key: string) {
    return this.#store.get(key)
  }

  set(key: string, value: unknown) {
    this.#store.set(key, value)
  }

  delete(key: string) {
    return this.#store.delete(key)
  }
}
