const route = require("express").Router();
// eslint-disable-next-line
const requireAuth = require("../middlewares/auth");
// eslint-disable-next-line
const roleAuth = require("../middlewares/role");
const { getUsers, addUser } = require("../controllers/user");

route.get("/", getUsers);

route.post("/", addUser);

module.exports = route;
