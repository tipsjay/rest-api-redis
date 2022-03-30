import redis from "../../utils/index";
module.exports = {
  getAll: ({ body }: any) => {
    // return r.table('users').run()
    console.log("params", body);
    redis.list(body);
  },
  getById: (id: any) => {
    // return r.table("users").get(id).run();
    return [
      {
        id,
        name: "dummy",
      },
    ];
  },
  createUser: (data: any) => {
    const { database, dataset, column } = data;
    // return r.table("users").insert(data).run();
    return redis.applyCreateIndex(database, dataset, column);
  },
};
