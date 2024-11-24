import bcrypt from "bcryptjs";
import { User } from "../model/index.js";
import { genarateToken } from "../lib/utils.js";

export const signUp = async (req, res) => {
  const { username, email, password, fullName } = req.body;

  if (!username || !email || !password || !fullName)
    return res.status(501).json({ message: "Enter required data" });

  const isUser = await User.findOne({ $or: [{ username }, { email }] });

  if (isUser)
    return res.status(501).json({ message: "username or email already exist" });

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    fullName,
    email,
    password: hashPassword,
  });

  await newUser.save();

  genarateToken(newUser._id, res);

  return res
    .status(201)
    .json({ userId: newUser._id, message: "user has been created" });
};

export const login = async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})

    if(!user) return  res.status(501).json({ message: "user not exist" });

    let token = null

    if(await bcrypt.compare(password, user.password)){
        token =  genarateToken(user._id, res)
        return res
    .status(201)
    .json({ userId: user._id, message: `${user.fullName} logged in 👋 `, token });
    }else{
        return  res.status(501).json({ message: "incoorect password"});
    }
}

export const authCheck = async (req, res) => {
  res.json({user: req.user})
}