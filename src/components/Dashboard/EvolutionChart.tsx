import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Fev", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Abr", value: 280 },
  { name: "Mai", value: 590 },
  { name: "Jun", value: 320 },
];

export function EvolutionChart({ title }: { title: string }) {
  return (
    <div className="mt-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
      <h3 className="text-lg font-bold mb-6">{title}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#bd1522" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#bd1522" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#bd1522"
                fillOpacity={1}
                fill="url(#colorVal)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legendas Laterais */}
        <div className="flex flex-col gap-4 justify-center">
          <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              Mês + Crítico
            </span>
            <h5 className="text-sm font-extrabold text-red-600">
              Setembro 2025
            </h5>
          </div>
          <div className="p-4 border border-gray-100 rounded-xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              Tendência
            </span>
            <h5 className="text-sm font-extrabold text-blue-600">
              Crescimento
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
