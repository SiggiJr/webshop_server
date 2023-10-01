import { ObjectId } from "mongodb";
import { getDb } from "../utils/db.js";
import { deleteImage, uploadImage } from "../utils/imageService.js";

export const addProduct = async (req, res) => {
  try {
    const result = await uploadImage(req.file.buffer);
    console.log(result);
    req.body.img_url = result.secure_url;
    req.body.public_id = result.public_id;
    const db = await getDb();
    db.collection("products").insertOne(req.body);
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
  res.end();
  // const newProduct = req.body;
  // console.log(newProduct);
  // const db = await getDb();
  // db.collection("products").insertOne(newProduct);
  // res.end();
};

export const getProducts = async (req, res) => {
  const db = await getDb();
  const response = await db.collection("products").find().toArray();
  console.log(response);
  res.json(response);
};

export const updateOne = async (req, res) => {
  try {
    const updatedData = req.body;
    const id = updatedData.id;
    delete updatedData.id;
    const db = await getDb();
    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      updatedData.img_url = result.secure_url;
      updatedData.public_id = result.public_id;
      const oldProduct = await db.collection("products").findOne({ _id: new ObjectId(id) });
      await deleteImage(oldProduct.public_id);
    }
    await db.collection("products").replaceOne({ _id: new ObjectId(id) }, updatedData);
  } catch (err) {
    console.log(err);
  }
  // const updatedData = req.body;
  // const id = updatedData.id;
  // delete updatedData.id;
  // console.log(updatedData);
  // const db = await getDb();
  // await db.collection("products").replaceOne({ _id: new ObjectId(id) }, updatedData);

  res.end();
};

export const getAnimal = async (req, res) => {
  // console.log(req.body);
  const db = await getDb();
  const response = await db.collection("products").findOne({ _id: new ObjectId(req.params.id) });
  console.log(response);
  res.json(response);
};

export const killArticle = async (req, res) => {
  const db = await getDb();
  const result = await db.collection("products").findOne({ _id: new ObjectId(req.params.id) });
  console.log(result);
  const publicId = result.public_id;
  const id = result._id;
  db.collection("products").deleteOne({ _id: new ObjectId(id) });
  const resultCloudinary = await deleteImage(publicId);
  console.log(resultCloudinary);
  res.end();
};
