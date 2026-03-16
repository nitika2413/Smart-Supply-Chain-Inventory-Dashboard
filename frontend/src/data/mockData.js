// ─── Mock Data for the Supply Chain Dashboard ───

const now = new Date();
const daysAgo = (d) => {
  const date = new Date(now);
  date.setDate(now.getDate() - d);
  return date.toISOString();
};

let _id = 0;
const nextId = () => String(++_id);

// ─── Products ───
export const products = [
  { id: nextId(), name: 'Nestlé Fresh Milk 1L',          category: 'Milk Products', stockQuantity: 150, minStockThreshold: 50,  supplier: 'Nestlé Dairy Division',   price: 65,  lastUpdated: daysAgo(1) },
  { id: nextId(), name: 'Nestlé Slim Milk 500ml',         category: 'Milk Products', stockQuantity: 28,  minStockThreshold: 40,  supplier: 'Nestlé Dairy Division',   price: 45,  lastUpdated: daysAgo(0) },
  { id: nextId(), name: 'Nestlé A+ Curd 400g',            category: 'Milk Products', stockQuantity: 80,  minStockThreshold: 30,  supplier: 'Nestlé Dairy Division',   price: 55,  lastUpdated: daysAgo(3) },
  { id: nextId(), name: 'Nescafé Classic 200g',            category: 'Coffee',        stockQuantity: 200, minStockThreshold: 60,  supplier: 'Nescafé India',           price: 350, lastUpdated: daysAgo(2) },
  { id: nextId(), name: 'Nescafé Gold 100g',               category: 'Coffee',        stockQuantity: 12,  minStockThreshold: 25,  supplier: 'Nescafé India',           price: 550, lastUpdated: daysAgo(1) },
  { id: nextId(), name: 'Nescafé Sunrise 500g',            category: 'Coffee',        stockQuantity: 120, minStockThreshold: 40,  supplier: 'Nescafé India',           price: 280, lastUpdated: daysAgo(4) },
  { id: nextId(), name: 'Maggi 2-Min Noodles (12 Pack)',   category: 'Noodles',       stockQuantity: 300, minStockThreshold: 100, supplier: 'Maggi India',             price: 144, lastUpdated: daysAgo(0) },
  { id: nextId(), name: 'Maggi Atta Noodles (4 Pack)',     category: 'Noodles',       stockQuantity: 6,   minStockThreshold: 30,  supplier: 'Maggi India',             price: 96,  lastUpdated: daysAgo(5) },
  { id: nextId(), name: 'Maggi Cup Noodles Masala',        category: 'Noodles',       stockQuantity: 90,  minStockThreshold: 25,  supplier: 'Maggi India',             price: 55,  lastUpdated: daysAgo(1) },
  { id: nextId(), name: 'KitKat 4-Finger (Box of 24)',    category: 'Chocolate',     stockQuantity: 60,  minStockThreshold: 20,  supplier: 'Nestlé Confectionery',    price: 480, lastUpdated: daysAgo(2) },
  { id: nextId(), name: 'Munch (Box of 48)',               category: 'Chocolate',     stockQuantity: 5,   minStockThreshold: 15,  supplier: 'Nestlé Confectionery',    price: 240, lastUpdated: daysAgo(6) },
  { id: nextId(), name: 'Milkybar 25g (Box of 24)',        category: 'Chocolate',     stockQuantity: 45,  minStockThreshold: 20,  supplier: 'Nestlé Confectionery',    price: 360, lastUpdated: daysAgo(3) },
  { id: nextId(), name: 'Cerelac Stage 1 (300g)',          category: 'Baby Food',     stockQuantity: 70,  minStockThreshold: 20,  supplier: 'Nestlé Nutrition',        price: 280, lastUpdated: daysAgo(1) },
  { id: nextId(), name: 'Cerelac Stage 2 (300g)',          category: 'Baby Food',     stockQuantity: 10,  minStockThreshold: 15,  supplier: 'Nestlé Nutrition',        price: 295, lastUpdated: daysAgo(4) },
  { id: nextId(), name: 'Lactogen 1 (400g)',               category: 'Baby Food',     stockQuantity: 55,  minStockThreshold: 20,  supplier: 'Nestlé Nutrition',        price: 450, lastUpdated: daysAgo(2) },
];

// ─── Helper: generate random sales ───
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWeekLabel(weeksAgo) {
  const d = new Date(now);
  d.setDate(d.getDate() - weeksAgo * 7);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Weekly Sales Trends (8 weeks) ───
export const weeklySalesTrends = Array.from({ length: 8 }, (_, i) => {
  const weekIdx = 7 - i;
  return {
    week: `Week ${i + 1}`,
    label: generateWeekLabel(weekIdx),
    totalSales: rand(800, 2200),
    totalRevenue: rand(95000, 310000),
  };
});

// ─── Sales per Product ───
export const salesPerProduct = products.map((p) => ({
  name: p.name.length > 20 ? p.name.slice(0, 18) + '…' : p.name,
  fullName: p.name,
  totalQuantity: rand(40, 500),
  totalRevenue: rand(5000, 150000),
}));

// ─── Category Sales ───
const categories = ['Milk Products', 'Coffee', 'Noodles', 'Chocolate', 'Baby Food'];
export const categorySales = categories.map((cat) => ({
  category: cat,
  totalQuantity: rand(200, 1200),
  totalRevenue: rand(30000, 350000),
}));

// ─── Top Sellers ───
export const topSellers = [
  { name: 'Maggi 2-Min Noodles',  category: 'Noodles',       totalQuantity: 482, totalRevenue: 69408 },
  { name: 'Nescafé Classic 200g', category: 'Coffee',        totalQuantity: 398, totalRevenue: 139300 },
  { name: 'KitKat (Box of 24)',   category: 'Chocolate',     totalQuantity: 310, totalRevenue: 148800 },
  { name: 'Nestlé Fresh Milk 1L', category: 'Milk Products', totalQuantity: 290, totalRevenue: 18850 },
  { name: 'Cerelac Stage 1',      category: 'Baby Food',     totalQuantity: 245, totalRevenue: 68600 },
];

// ─── Declining Products ───
export const decliningProducts = [
  { name: 'Munch (Box of 48)',           category: 'Chocolate',   currentSales: 38,  previousSales: 85,  declinePercentage: 55 },
  { name: 'Maggi Atta Noodles (4 Pack)', category: 'Noodles',     currentSales: 22,  previousSales: 44,  declinePercentage: 50 },
  { name: 'Cerelac Stage 2 (300g)',      category: 'Baby Food',   currentSales: 30,  previousSales: 48,  declinePercentage: 38 },
  { name: 'Nestlé Slim Milk 500ml',     category: 'Milk Products', currentSales: 52, previousSales: 78,  declinePercentage: 33 },
];

// ─── Demand Predictions ───
export const demandPredictions = products.map((p) => {
  const base = rand(30, 120);
  const trends = ['increasing', 'stable', 'decreasing'];
  const trend = trends[rand(0, 2)];
  return {
    productName: p.name,
    category: p.category,
    predictedDemand: base,
    trend,
    confidence: ['High', 'Medium', 'Low'][rand(0, 2)],
    currentStock: p.stockQuantity,
    daysOfStock: p.stockQuantity > 0 ? Math.round((p.stockQuantity / Math.max(base / 7, 1))) : 0,
  };
});

// ─── Warehouse Distribution ───
export const warehouseDistribution = categories.map((cat) => ({
  name: cat,
  value: products.filter((p) => p.category === cat).reduce((a, p) => a + p.stockQuantity, 0),
}));
