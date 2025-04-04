import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt-token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true, //makes token in accessible by javascript
    sameSite:'strict',
    secure: process.env.NODE_ENV!=="development"
  });

  return token;
};
