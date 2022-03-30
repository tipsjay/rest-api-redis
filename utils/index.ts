import { RedisDB } from "../src/db/index";
const redis = new RedisDB({
  config: {
    host: "localhost",
    port: 6379,
    db: 1,
  },
});

export default redis;
