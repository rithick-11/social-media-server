import jwt from "jsonwebtoken";
import { User } from "../model/index.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token === undefined) {
      return res
        .status(501)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = await jwt.verify(token, process.env.JWt_KEY);

    if (!decoded) {
      return res
        .status(501)
        .json({ message: "Unauthorized - Invaild Token Provided" });
    }

    const user = await User.findOne({ _id: decoded.userId }).select(
      "-password"
    );

    req.user = user;

    next();
  } catch (err) { 
    res.status(401).json({ message: "try login or signup" });
  }
};
