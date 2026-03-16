import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import SalesAnalytics from './pages/SalesAnalytics';
import SupplyChainInsights from './pages/SupplyChainInsights';

export default function App() {
  return (
    <div className="flex min-h-screen bg-surface-950">
      <Sidebar />
      {/* Main content — left margin matches sidebar width */}
      <main className="flex-1 ml-64 transition-all duration-300 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<SalesAnalytics />} />
            <Route path="/insights" element={<SupplyChainInsights />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
