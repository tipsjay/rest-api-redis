import Redis from "ioredis";
import { RedisStoreConfig } from "../../utils/types";
export class RedisDB {
  redis_config: RedisStoreConfig;
  redis_client: any;
  constructor(store_config: RedisStoreConfig) {
    const { config } = store_config;
    this.redis_config = store_config;

    //@ts-ignore
    this.redis_client = new Redis(config as Redis.RedisOptions);

    this.redis_client.on("connect", () => {
      console.error(`Redis Connected to ${config.host}:${config.port}`);
    });
  }

  async applyCreateIndex(
    database: string,
    dataset: string,
    column: string
  ): Promise<void> {
    const key = `database:${database}:${dataset}:${column}`;
    const config = JSON.stringify({});

    const exists = await this.redis_client.sismember(
      `${database}:${dataset}:indices`,
      key
    );

    console.log("exists", exists);

    if (exists) {
      console.error(`Index already exists ${JSON.stringify(exists, null, 2)}`);
    }

    await this.redis_client.sadd(`${database}:${dataset}:indices`, key);
    await this.redis_client.set(key, config);
  }

  async list(params: any) {
    const { database, dataset, order } = params;
    // const { start = 0, limit } = order;

    const items: string[] = await this.redis_client.keys(
      `${database}:${dataset}:item:*`
    );

    // const range = start + limit;
    // const upper_bound = range > items.length ? items.length : range;
    // const key_set = items.slice(start, upper_bound);

    return [
      {
        value: "this is testing",
      },
    ];
    // const current_set = await bluebird.map(key_set, async (key: string) => {
    //   const record = await this.redis_client.get(key);
    //   return JSON.parse(record) as unknown as StoreItem;
    // });

    // return bluebird.filter(
    //   current_set,
    //   (item: StoreItem) => item.tombstone !== 1
    // );
  }
}
