const User = require("../models/user");
const { hashPassword } = require("../utils/authentications");

exports.addUser = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      password: await hashPassword(req.body.password),
    };
    const user = new User(data);
    await user.save();
    return res.status(200).json({
      message: "User added successfully",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};
