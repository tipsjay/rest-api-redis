require("dotenv").config();
const _express = require("express");
const _app = _express();
const users = require("./src/controllers/user");

const { PORT = 3000 } = process.env;

_app.use(require("cors")());
_app.use(_express.json());
_app.use("/user", users);

_app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});
