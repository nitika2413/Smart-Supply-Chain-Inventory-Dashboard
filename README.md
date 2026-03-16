# 🏭 Smart Supply Chain & Inventory Dashboard

> A professional analytics dashboard that simulates how an FMCG company like **Nestlé** monitors product inventory, sales trends, and supply chain analytics — built with **React**, **Tailwind CSS**, and **Recharts**.

---

## ✨ Features

### 📊 Dashboard Overview
- **Real-time KPIs** — Total products, revenue, low stock alerts, and total stock units displayed through glass-morphism stat cards
- **Warehouse Distribution** — Interactive donut chart showing stock breakdown by category
- **Top Sellers** — Ranked product list with animated progress bars
- **Low Stock Alert** — Dismissible alert banner highlighting products below threshold

### 📦 Inventory Management
- Full **CRUD operations** — Add, edit, and delete products via modal forms
- **Search & filter** — Real-time search across products and suppliers with category dropdown
- **Status indicators** — "In Stock" / "Restock Required" badges with red row highlighting for low-stock items
- **Responsive table** — Product | Category | Stock | Status | Supplier | Last Updated

### 📈 Sales Analytics
- **Weekly Trends** — Area chart with gradient fill showing 8-week sales trend
- **Sales by Product** — Horizontal bar chart with color-coded product comparison
- **Category Breakdown** — Donut chart with detailed revenue/unit breakdown table
- **Tab navigation** — Switch between chart views with smooth tab UI

### 🔮 Supply Chain Insights
- **Demand Prediction** — Moving-average algorithm forecasting next week's demand per product with trend indicators (Rising/Stable/Declining) and confidence levels (High/Medium/Low)
- **Days of Stock** — Calculated stock runway with warning indicators
- **Top Selling Products** — Revenue bar chart
- **Declining Products** — Cards showing percentage decline with animated progress bars

---

## 🛠️ Tech Stack

| Layer               | Technology           |
|---------------------|----------------------|
| **Frontend**        | React 19             |
| **Build Tool**      | Vite 6               |
| **Styling**         | Tailwind CSS 3       |
| **Charts**          | Recharts 2           |
| **Icons**           | Lucide React         |
| **Routing**         | React Router DOM 7   |

---

## 📸 Screenshots

### Dashboard Overview
*Stat cards, warehouse distribution, top sellers, and low stock alerts*

### Inventory Management
*Search, filter, CRUD operations with status badges*

### Sales Analytics
*Interactive weekly trends, product sales, and category breakdown charts*

### Supply Chain Insights
*Demand prediction table with trend analysis and declining product cards*

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/supply-chain-dashboard.git
cd supply-chain-dashboard

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
cd frontend
npm run build
npm run preview
```

---

## 📁 Folder Structure

```
frontend/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── mockData.js         # 15 FMCG products + sales data
    ├── components/
    │   ├── Sidebar.jsx          # Collapsible navigation
    │   ├── StatCard.jsx         # Reusable KPI card
    │   ├── AlertBanner.jsx      # Low stock alerts
    │   └── ProductModal.jsx     # Add/Edit product form
    └── pages/
        ├── Dashboard.jsx        # Overview with charts
        ├── Inventory.jsx        # CRUD table with filters
        ├── SalesAnalytics.jsx   # Tabbed chart views
        └── SupplyChainInsights.jsx  # AI predictions
```

---

## 🔮 Future Improvements

- **Backend Integration** — Connect to Node.js/Express API with MongoDB for persistent data
- **Authentication** — Role-based access for warehouse managers vs. executives
- **Real-time Updates** — WebSocket integration for live inventory tracking
- **Export Reports** — PDF/Excel export for sales and inventory reports
- **Multi-warehouse** — Support for multiple warehouse locations with map visualization
- **Advanced ML** — Integrate TensorFlow.js for more accurate demand forecasting
- **Dark/Light Mode** — Theme toggle for user preference
- **Mobile App** — React Native companion app for warehouse staff

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ for FMCG supply chain intelligence
</p>
