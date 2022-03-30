export interface RedisConfig {
  port: number;
  host: string;
  password?: string;
  db: number;
}

export interface StoreConfig {
  initial_state?: any;
  transport?: any;
  //   message_store?: MessageStore;
}

export interface RedisStoreConfig extends StoreConfig {
  config: RedisConfig;
}
