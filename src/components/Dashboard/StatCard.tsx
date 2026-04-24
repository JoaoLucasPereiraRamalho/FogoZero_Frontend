interface StatCardProps {
  label: string;
  value: string;
  description: string;
  trend?: string;
  icon?: React.ReactNode;
}

export function StatCard({
  label,
  value,
  description,
  trend,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider leading-tight w-2/3">
          {label}
        </span>
        <div className="p-2 bg-orange-50 rounded-lg text-[#bd1522]">{icon}</div>
      </div>
      <div className="mt-4">
        <h4 className="text-2xl font-extrabold text-black">{value}</h4>
        <p className="text-[10px] text-gray-400 mt-1">{description}</p>
      </div>
      {trend && (
        <div className="mt-2 text-xs font-bold text-green-600">{trend}</div>
      )}
    </div>
  );
}
