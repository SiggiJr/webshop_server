import { verifyToken } from "../utils/token.js";

export const auth = (req, res, next) => {
  const token = req.get("authorization").split(" ")[1];
  try {
    const payload = verifyToken(token);
    req.payload = payload;
    next();
  } catch (err) {
    res.status(403).end();
  }
};
