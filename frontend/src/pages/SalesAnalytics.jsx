import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, Area, AreaChart,
} from 'recharts';
import { weeklySalesTrends, salesPerProduct, categorySales } from '../data/mockData';

const COLORS = ['#338dff', '#22c55e', '#f59e0b', '#a855f7', '#ef4444'];
const tabs = ['Weekly Trends', 'Sales by Product', 'Category Breakdown'];

const GlassTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 border-surface-600/50 shadow-lg">
        <p className="text-xs font-semibold text-white mb-1">{label || payload[0].name}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-xs text-surface-400">
            {p.dataKey === 'totalRevenue' ? `₹${(p.value / 1000).toFixed(1)}K` : `${p.value} units`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SalesAnalytics() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Sales Analytics</h1>
        <p className="text-sm text-surface-400 mt-1">Interactive sales data visualization and trends</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 stat-gradient-blue">
          <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Total Units Sold</p>
          <p className="text-xl font-bold text-white mt-1">{weeklySalesTrends.reduce((a, w) => a + w.totalSales, 0).toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 stat-gradient-green">
          <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Total Revenue</p>
          <p className="text-xl font-bold text-white mt-1">₹{(weeklySalesTrends.reduce((a, w) => a + w.totalRevenue, 0) / 100000).toFixed(1)}L</p>
        </div>
        <div className="glass-card p-4 stat-gradient-purple">
          <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Avg Weekly Sales</p>
          <p className="text-xl font-bold text-white mt-1">{Math.round(weeklySalesTrends.reduce((a, w) => a + w.totalSales, 0) / weeklySalesTrends.length).toLocaleString()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-800/40 p-1 rounded-xl w-fit">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === i
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="glass-card p-5">
        {activeTab === 0 && (
          <div>
            <h2 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">Weekly Sales & Revenue Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklySalesTrends}>
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#338dff" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#338dff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
                  <Tooltip content={<GlassTooltip />} />
                  <Area type="monotone" dataKey="totalSales" stroke="#338dff" fill="url(#salesGrad)" strokeWidth={2.5} dot={{ fill: '#338dff', r: 4 }} activeDot={{ r: 6, fill: '#338dff' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <h2 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">Sales Per Product</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesPerProduct.slice(0, 10)} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={140} axisLine={{ stroke: '#334155' }} />
                  <Tooltip content={<GlassTooltip />} />
                  <Bar dataKey="totalQuantity" radius={[0, 6, 6, 0]} barSize={20}>
                    {salesPerProduct.slice(0, 10).map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <h2 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">Category-wise Revenue Distribution</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categorySales}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={110}
                      paddingAngle={4}
                      dataKey="totalRevenue"
                      nameKey="category"
                      stroke="none"
                    >
                      {categorySales.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip content={<GlassTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      formatter={(val) => <span className="text-xs text-surface-400">{val}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 flex flex-col justify-center">
                {categorySales.map((cat, i) => (
                  <div key={cat.category} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-surface-800/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-sm font-medium text-surface-300">{cat.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">₹{(cat.totalRevenue / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-surface-500">{cat.totalQuantity} units</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
