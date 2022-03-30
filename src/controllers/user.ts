const router = require("express").Router();
const UserModel = require("../models/user");

router
  .get("/", async (req: any, res: any) => {
    const users = await UserModel.getAll(req);
    return res.send(users);
  })
  .get("/:id", async (req: any, res: any) => {
    const user = await UserModel.getById(req.params.id);
    return res.send(user);
  })
  .post("/", async (req: any, res: any) => {
    const result = await UserModel.createUser(req.body);
    console.log(result);

    return res.send(result);
  });

module.exports = router;
