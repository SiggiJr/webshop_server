import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "20min" });
  return token;
};

export const checkToken = (_, res) => {
  res.end();
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
