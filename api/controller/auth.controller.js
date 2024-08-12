import User from "../models/UserModels.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!password && !email && !username) {
    return next(errorHandler(400, "please fill all the value"));
  }
  if (!password) {
    return next(errorHandler(400, "please fill the password"));
  }
  const hashedpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpassword });

  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
  console.log(req.body);
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validuser = await User.findOne({ email });
    if (!validuser) return next(errorHandler(404, "User Not Found"));
    const validpassword = bcryptjs.compareSync(password, validuser.password);
    if (!validpassword) return next(errorHandler(404, "Password is Incorrect"));
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validuser._doc;
    res.cookie("acces_token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("acces_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedpassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.bdoy.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedpassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("acces_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
