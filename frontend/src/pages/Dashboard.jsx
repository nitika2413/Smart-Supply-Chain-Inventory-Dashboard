import { useMemo } from 'react';
import { Package, DollarSign, AlertTriangle, Warehouse } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import StatCard from '../components/StatCard';
import AlertBanner from '../components/AlertBanner';
import { products, warehouseDistribution, weeklySalesTrends, topSellers } from '../data/mockData';

const COLORS = ['#338dff', '#22c55e', '#f59e0b', '#a855f7', '#ef4444'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 border-surface-600/50">
        <p className="text-xs font-semibold text-white">{payload[0].name}</p>
        <p className="text-xs text-surface-400">{payload[0].value.toLocaleString()} units</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const lowStock = useMemo(() => products.filter(p => p.stockQuantity < p.minStockThreshold), []);
  const totalRevenue = useMemo(() => weeklySalesTrends.reduce((a, w) => a + w.totalRevenue, 0), []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-surface-400 mt-1">Real-time supply chain analytics for FMCG operations</p>
      </div>

      {/* Alert */}
      <AlertBanner lowStockItems={lowStock} />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={products.length}
          subtitle={`${products.filter(p => p.stockQuantity >= p.minStockThreshold).length} in stock`}
          icon={Package}
          gradient="stat-gradient-blue"
          iconColor="bg-brand-500/15 text-brand-400"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
          subtitle="Last 8 weeks"
          icon={DollarSign}
          gradient="stat-gradient-green"
          iconColor="bg-emerald-500/15 text-emerald-400"
        />
        <StatCard
          title="Low Stock Alerts"
          value={lowStock.length}
          subtitle="Need restocking"
          icon={AlertTriangle}
          gradient="stat-gradient-amber"
          iconColor="bg-amber-500/15 text-amber-400"
        />
        <StatCard
          title="Total Stock Units"
          value={products.reduce((a, p) => a + p.stockQuantity, 0).toLocaleString()}
          subtitle="Across all warehouses"
          icon={Warehouse}
          gradient="stat-gradient-purple"
          iconColor="bg-purple-500/15 text-purple-400"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warehouse Distribution */}
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">Warehouse Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={warehouseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {warehouseDistribution.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} className="transition-all duration-300 hover:opacity-80" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  formatter={(value) => <span className="text-xs text-surface-400">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Sellers */}
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">Top Selling Products</h2>
          <div className="space-y-3">
            {topSellers.map((item, idx) => {
              const maxQty = topSellers[0].totalQuantity;
              const percent = (item.totalQuantity / maxQty) * 100;
              return (
                <div key={item.name} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-surface-500 w-5">#{idx + 1}</span>
                      <span className="text-sm font-medium text-surface-200 group-hover:text-white transition-colors">{item.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-surface-400">{item.totalQuantity} units</span>
                  </div>
                  <div className="h-2 bg-surface-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${percent}%`, backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-5 pt-4 border-t border-surface-700/50 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-surface-500 font-medium">Best Category</p>
              <p className="text-sm font-semibold text-white mt-0.5">Noodles</p>
            </div>
            <div>
              <p className="text-xs text-surface-500 font-medium">Top Revenue</p>
              <p className="text-sm font-semibold text-emerald-400 mt-0.5">₹{(topSellers[0].totalRevenue / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Table */}
      {lowStock.length > 0 && (
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertTriangle size={14} />
            Items Requiring Restock
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-700/50">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Product</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Category</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Stock</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Threshold</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((p) => (
                  <tr key={p.id} className="border-b border-surface-800/40 hover:bg-red-500/5 transition-colors">
                    <td className="py-3 px-3 font-medium text-surface-200">{p.name}</td>
                    <td className="py-3 px-3 text-surface-400">{p.category}</td>
                    <td className="py-3 px-3 text-right font-semibold text-red-400">{p.stockQuantity}</td>
                    <td className="py-3 px-3 text-right text-surface-500">{p.minStockThreshold}</td>
                    <td className="py-3 px-3"><span className="badge-danger">Restock Required</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
