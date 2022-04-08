const Router = require("express").Router();
const userRoutes = require("./appRoutes/user");
const { signIn } = require("./controllers/user");

Router.post("/signIn", signIn);

Router.use("/user", userRoutes);

module.exports = Router;
