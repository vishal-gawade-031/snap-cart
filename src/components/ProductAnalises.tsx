import connectDb from "@/lib/db";
import Grocery from "@/models/grocery.model";
import ProductAnalisesView, {
  type ProductAnalisesData,
} from "./ProductAnalisesView";

type GroceryItem = {
  _id?: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
  createdAt?: string;
};

const salesMultipliers: Record<string, number> = {
  "Fruits & Vegetables": 42,
  "Dairy & Eggs": 36,
  "Rice, Atta & Grains": 24,
  "Snacks & Biscuits": 31,
  "Spices & Masalas": 18,
  "Beverages & Drinks": 28,
  "Personal Care": 14,
  "Household Essentials": 16,
  "Instant & Packaged Food": 22,
  "Baby & Pet Care": 11,
};

function getPrice(value: string) {
  const price = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(price) ? price : 0;
}

function formatCurrency(value: number) {
  return `Rs. ${Math.round(value).toLocaleString("en-IN")}`;
}

export default async function ProductAnalises() {
  await connectDb();
  const groceries = await Grocery.find({}).sort({ createdAt: -1 });
  const products: GroceryItem[] = JSON.parse(JSON.stringify(groceries));

  const totalProducts = products.length;
  const categories = new Set(products.map((item) => item.category));
  const averagePrice =
    totalProducts > 0
      ? products.reduce((sum, item) => sum + getPrice(item.price), 0) /
        totalProducts
      : 0;

  const productsWithSales = products.map((item, index) => {
    const priceNumber = getPrice(item.price);
    const unitsSold =
      (salesMultipliers[item.category] ?? 15) + ((index % 5) + 1) * 3;

    return {
      ...item,
      priceNumber,
      unitsSold,
      revenue: priceNumber * unitsSold,
    };
  });

  const totalSales = productsWithSales.reduce(
    (sum, item) => sum + item.revenue,
    0
  );
  const topProducts = [...productsWithSales]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
  const categorySales = Object.values(
    productsWithSales.reduce<
      Record<string, { category: string; products: number; sales: number }>
    >((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = {
          category: item.category,
          products: 0,
          sales: 0,
        };
      }

      acc[item.category].products += 1;
      acc[item.category].sales += item.revenue;
      return acc;
    }, {})
  ).sort((a, b) => b.sales - a.sales);

  const maxCategorySales = Math.max(
    ...categorySales.map((item) => item.sales),
    1
  );
  const bestCategory = categorySales[0]?.category ?? "No category";

  const data: ProductAnalisesData = {
    bestCategory,
    maxCategorySales,
    totalSales: formatCurrency(totalSales),
    stats: [
      {
        label: "Total Sales",
        value: formatCurrency(totalSales),
        detail: "Estimated grocery revenue",
        icon: "sales",
        tone: "green",
      },
      {
        label: "Total Products",
        value: totalProducts.toString(),
        detail: "Live products in store",
        icon: "products",
        tone: "emerald",
      },
      {
        label: "Categories",
        value: categories.size.toString(),
        detail: `${bestCategory} leads sales`,
        icon: "categories",
        tone: "cyan",
      },
      {
        label: "Average Price",
        value: formatCurrency(averagePrice),
        detail: "Across all groceries",
        icon: "price",
        tone: "amber",
      },
    ],
    categorySales: categorySales.map((item) => ({
      ...item,
      formattedSales: formatCurrency(item.sales),
    })),
    topProducts: topProducts.map((item) => ({
      id: item._id ?? item.name,
      name: item.name,
      category: item.category,
      unit: item.unit,
      unitsSold: item.unitsSold,
      formattedPrice: formatCurrency(item.priceNumber),
      formattedRevenue: formatCurrency(item.revenue),
    })),
    storeHealth: {
      fastMovers: topProducts.length,
      lowFocus: Math.max(0, totalProducts - topProducts.length),
    },
  };

  return <ProductAnalisesView data={data} />;
}
