import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

export default function AlertBanner({ lowStockItems }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !lowStockItems || lowStockItems.length === 0) return null;

  return (
    <div className="glass-card border-red-500/30 bg-red-500/5 p-4 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center flex-shrink-0 animate-pulse-soft">
          <AlertTriangle size={18} className="text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-red-300 mb-1">Low Stock Alert</h3>
          <p className="text-xs text-red-400/80 mb-2">
            {lowStockItems.length} product{lowStockItems.length > 1 ? 's' : ''} below minimum threshold
          </p>
          <div className="flex flex-wrap gap-1.5">
            {lowStockItems.slice(0, 5).map((item) => (
              <span key={item.id} className="badge-danger text-[11px]">
                {item.name.length > 22 ? item.name.slice(0, 20) + '…' : item.name} — {item.stockQuantity} left
              </span>
            ))}
            {lowStockItems.length > 5 && (
              <span className="badge-warning text-[11px]">+{lowStockItems.length - 5} more</span>
            )}
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-red-500/60 hover:text-red-400 transition-colors flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
