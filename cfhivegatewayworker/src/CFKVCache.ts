import Logger from './CustomLogger';

class CFWorkerKVCache {
    private kv?: any;
    private logger?: Logger;
    constructor(config: { namespace: any; logger?: Logger }) {
      this.logger = config.logger?.child("KV");
      this.kv = config.namespace;
    }
  
    async get<T>(key: string): Promise<T | undefined> {
      const res = await this.kv?.get(key, "json");
      this.logger?.debug("key", key, res);
      return res;
    }
  
    async getKeysByPrefix(prefix: string): Promise<string[]> {
      const result = await this.kv?.list({
        prefix,
      });
      this.logger?.debug("getKeysByPrefix", prefix, result);
  
      if (!result) {
        return [];
      }
  
      return result.keys.map((keyEntry) => keyEntry.name);
    }
  
    async set(
      key: string,
      value: any,
      options?: { ttl?: number }
    ): Promise<void> {
      this.logger?.debug("set", key);
      return this.kv?.put(key, JSON.stringify(value), {
        expirationTtl: options?.ttl,
      });
    }
  
    async delete(key: string): Promise<void> {
      this.logger?.debug("delete", key);
      return this.kv?.delete(key);
    }
  }

  export default CFWorkerKVCache;