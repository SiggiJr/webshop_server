import { getDb } from "../utils/db.js";
import { createToken } from "../utils/token.js";

const COL = "admins";

export const adminLogin = async (req, res) => {
  console.log(req.body);
  const db = await getDb();
  const result = await db.collection(COL).findOne({ ...req.body });
  console.log(result);
  if (!result) {
    res.status(403).end();
  } else {
    const token = createToken({ user: result._id });
    res.json(token);
  }
};
