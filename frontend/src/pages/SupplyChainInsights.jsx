import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight, Brain } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { demandPredictions, topSellers, decliningProducts } from '../data/mockData';

const COLORS = ['#338dff', '#22c55e', '#f59e0b', '#a855f7', '#ef4444'];

const trendConfig = {
  increasing: { icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Rising' },
  stable:     { icon: Minus,      color: 'text-blue-400',    bg: 'bg-blue-500/10',    label: 'Stable' },
  decreasing: { icon: TrendingDown, color: 'text-red-400',   bg: 'bg-red-500/10',     label: 'Declining' },
};

const GlassTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 border-surface-600/50 shadow-lg">
        <p className="text-xs font-semibold text-white">{payload[0].payload._id || payload[0].payload.name}</p>
        <p className="text-xs text-surface-400">₹{(payload[0].value / 1000).toFixed(1)}K revenue</p>
      </div>
    );
  }
  return null;
};

export default function SupplyChainInsights() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Supply Chain Insights</h1>
        <p className="text-sm text-surface-400 mt-1">Demand forecasting, performance analysis, and inventory intelligence</p>
      </div>

      {/* Demand Prediction */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
            <Brain size={16} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">Demand Prediction</h2>
            <p className="text-xs text-surface-500">Next week forecast based on 4-week moving average</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-800/30">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Product</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Category</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Predicted Demand</th>
                <th className="text-center py-2.5 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Trend</th>
                <th className="text-center py-2.5 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Confidence</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Current Stock</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Days of Stock</th>
              </tr>
            </thead>
            <tbody>
              {demandPredictions.map((p) => {
                const trend = trendConfig[p.trend];
                const TrendIcon = trend.icon;
                const stockDanger = p.daysOfStock < 7;
                return (
                  <tr key={p.productName} className="border-t border-surface-800/40 hover:bg-surface-800/20 transition-colors">
                    <td className="py-3 px-3 font-medium text-surface-200 max-w-[200px] truncate">{p.productName}</td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-medium bg-surface-700/60 text-surface-300 px-2 py-0.5 rounded-md">{p.category}</span>
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-white">{p.predictedDemand} <span className="text-surface-500 font-normal text-xs">units</span></td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${trend.bg} ${trend.color}`}>
                        <TrendIcon size={12} /> {trend.label}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-xs font-semibold ${
                        p.confidence === 'High' ? 'text-emerald-400' : p.confidence === 'Medium' ? 'text-amber-400' : 'text-surface-500'
                      }`}>{p.confidence}</span>
                    </td>
                    <td className="py-3 px-3 text-right text-surface-300">{p.currentStock}</td>
                    <td className={`py-3 px-3 text-right font-semibold ${stockDanger ? 'text-red-400' : 'text-surface-300'}`}>
                      {p.daysOfStock}d {stockDanger && <span className="text-[10px] text-red-400/70">⚠</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sellers Chart */}
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">Top Selling Products</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSellers} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  axisLine={{ stroke: '#334155' }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
                <Tooltip content={<GlassTooltip />} />
                <Bar dataKey="totalRevenue" radius={[8, 8, 0, 0]} barSize={36}>
                  {topSellers.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Declining Products */}
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingDown size={14} />
            Products with Declining Sales
          </h2>
          <div className="space-y-3">
            {decliningProducts.length === 0 ? (
              <p className="text-sm text-surface-500 text-center py-8">No products with declining sales</p>
            ) : (
              decliningProducts.map((p) => (
                <div key={p.name} className="group p-3 rounded-xl border border-surface-700/40 hover:border-red-500/20 hover:bg-red-500/[0.03] transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-surface-200 group-hover:text-white transition-colors">{p.name}</p>
                      <p className="text-xs text-surface-500">{p.category}</p>
                    </div>
                    <div className="flex items-center gap-1 text-red-400">
                      <ArrowDownRight size={16} />
                      <span className="text-lg font-bold">{p.declinePercentage}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-surface-500">Previous:</span>
                      <span className="font-semibold text-surface-300">{p.previousSales}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-surface-500">Current:</span>
                      <span className="font-semibold text-red-400">{p.currentSales}</span>
                    </div>
                  </div>
                  {/* Decline bar */}
                  <div className="mt-2 h-1.5 bg-surface-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-700"
                      style={{ width: `${p.declinePercentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
