import "dotenv/config";
import express from "express";
import cors from "cors";
import { addProduct, getAnimal, getProducts, killArticle, updateOne } from "./controller/productsController.js";
import multer from "multer";
import { adminLogin } from "./controller/AdminController.js";
import { encrypt } from "./middlewares/encrypt.js";
import { checkToken } from "./utils/token.js";
import { auth } from "./middlewares/authMiddleware.js";

const PORT = process.env.PORT;

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.get("/api/products", getProducts);
app.get("/api/animal", getAnimal);
app.post("/api/products", upload.single("bild"), addProduct);
app.put("/api/products", upload.single("bild"), updateOne);
app.delete("/api/products/:id", killArticle);

//AdminRouten

app.post("/api/admin/login", encrypt, adminLogin);
app.get("/api/admin/check", auth, checkToken);

// Productsrouten

// app.post("/api/admin/addproduct")

app.listen(PORT, () => console.log("Server läuft auf Port:", PORT));
