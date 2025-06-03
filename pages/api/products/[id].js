// pages/api/products/[id].js
import connectDB from "@/utils/db";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await connectDB();
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ error: "Not found" });
        return res.status(200).json(product);
      } catch {
        return res.status(500).json({ error: "Failed to get product" });
      }

    case "PUT":
      try {
        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updated);
      } catch {
        return res.status(400).json({ error: "Failed to update" });
      }

    case "DELETE":
      try {
        await Product.findByIdAndDelete(id);
        return res.status(204).end();
      } catch {
        return res.status(500).json({ error: "Failed to delete" });
      }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
