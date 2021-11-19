const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");

const { transformUser } = require("../../helpers/resolversHelpers.js");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (args) => {
    let user;
    let hashedPassword;
    try {
      let foundedUser = await User.findOne({ email: args.userInput.email });
      if (foundedUser) {
        throw new Error("User is allready exists");
      }
      hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      user = await new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      await user.save();
      return transformUser(user);
    } catch (error) {
      throw error;
    }
  },
  login: async (args, { req, res }) => {
    try {
      //make sure email is exist
      const existedUser = await User.findOne({ email: args.email });

      if (!existedUser) throw new Error("User doesn't exist!");
      //make sure the passwords are equal
      const isEqual = await bcrypt.compare(args.password, existedUser.password);
      if (!isEqual) throw new Error("Password is invalid!");
      //give him a token and expiratin
      //token = jwt.sign({some info}, "secretkey", {expiredIn})

      const expiresIn = 3600;
      const token = jwt.sign(
        { email: existedUser.email, userId: existedUser.id },
        process.env.TOKEN_SECRET_KEY,
        {
          expiresIn: expiresIn,
        }
      );
      res.cookie("token", `Bearer ${token}`, {
        httpOnly: true,
        maxAge: expiresIn * 1000,
      });
      const expiresAt = await jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        .exp;
      return {
        userId: existedUser.id,
        token: token,
        tokenExpiration: expiresAt,
      };
    } catch (error) {
      throw error;
    }
  },
  logout: async (args, { req, res }) => {
    if (!req.isAuth || req.isAuth === "" || req.isAuth === false) {
      throw new Error("unAuthenticated...!");
    }
    try {
      if (req.cookies && req.cookies.token) {
        //res.clearCookie("key");
        res.clearCookie("token");
        return {
          userID: req.userId,
          logoutAt: new Date(),
          message: "logout succesfull",
        };
      }
      return {
        userID: "",
        logoutAt: "",
        message: "already loggedout",
      };
    } catch (error) {
      throw error;
    }
  },
};
