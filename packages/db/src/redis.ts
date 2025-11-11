import type { RedisClientType } from 'redis';
import { createClient } from 'redis';

export class Redis {
  private client: RedisClientType;
  private connectPromise: Promise<any> | null = null;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || '',
    });
    this.client.on('error', err => {
      console.error('Redis Client Error', err);
    });
    this.connectPromise = this.client.connect();
  }

  async get(key: string) {
    await this.connectPromise;
    return this.client.get(key);
  }
  async set(key: string, value: string, ttl?: number) {
    await this.connectPromise;
    if (ttl) {
      await this.client.set(key, value, {
        expiration: {
          type: 'EX',
          value: ttl,
        },
      });
    } else {
      await this.client.set(key, value);
    }
  }
  async delete(key: string) {
    await this.connectPromise;
    await this.client.del(key);
  }

  async disconnect() {
    this.client.destroy();
  }
}
