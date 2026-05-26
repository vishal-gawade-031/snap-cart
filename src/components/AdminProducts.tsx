import connectDb from "@/lib/db";
import Grocery from "@/models/grocery.model";
import AdminProductsView, { type AdminProduct } from "./AdminProductsView";

function getPrice(value: string) {
  const price = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(price) ? price : 0;
}

function formatCurrency(value: number) {
  return `Rs. ${Math.round(value).toLocaleString("en-IN")}`;
}

export default async function AdminProducts() {
  await connectDb();

  const groceries = await Grocery.find({}).sort({ createdAt: -1 });
  const products = JSON.parse(JSON.stringify(groceries)) as AdminProduct[];

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, item) => sum + getPrice(item.price),
    0
  );
  const categories = new Set(products.map((item) => item.category));
  const latestProduct = products[0]?.name ?? "No products";

  return (
    <AdminProductsView
      products={products}
      summary={{
        totalProducts,
        categories: categories.size,
        averagePrice:
          totalProducts > 0 ? formatCurrency(totalValue / totalProducts) : "Rs. 0",
        latestProduct,
      }}
    />
  );
}
