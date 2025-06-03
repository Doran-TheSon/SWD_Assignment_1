// pages/api/products/index.js
import connectDB from "@/utils/db";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const products = await Product.find();
        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ error: "Failed to get products" });
      }

    case "POST":
      try {
        const newProduct = await Product.create(req.body);
        return res.status(201).json(newProduct);
      } catch (error) {
        return res.status(400).json({ error: "Failed to create product" });
      }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
