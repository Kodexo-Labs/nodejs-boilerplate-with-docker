const createError = require("http-errors");
const User = require("../models/user");
const { hashPassword, verifyPassword } = require("../utils/authentications");
const { signAccessToken, signRefreshToken } = require("../utils/jwtHelper");

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

exports.signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return next(createError(400, "User with this email does not exit"));

        const verifyPwd = await verifyPassword(password, user?.password);

        if (!verifyPwd) return next(createError(400, "Password is incorrect"));

        const accessToken = await signAccessToken({ ...user });
        const refreshToken = await signRefreshToken({ ...user });

        return res.status(200).json({
            accessToken,
            refreshToken,
            user: user,
        });
    } catch (error) {
        return next(error);
    }
};
