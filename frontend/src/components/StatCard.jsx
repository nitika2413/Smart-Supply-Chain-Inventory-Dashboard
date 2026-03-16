export default function StatCard({ title, value, subtitle, icon: Icon, gradient, iconColor }) {
  return (
    <div className={`glass-card-hover p-5 ${gradient} animate-slide-up`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-surface-400 font-medium">{subtitle}</p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconColor || 'bg-brand-500/15'}`}>
          {Icon && <Icon size={22} className={iconColor ? 'text-current' : 'text-brand-400'} />}
        </div>
      </div>
    </div>
  );
}
