import jwt from "jsonwebtoken";

export const genarateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWt_KEY, { expiresIn: "1d" });

  res.cookie("JWT_Token", token, {
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });

  return token;
};
