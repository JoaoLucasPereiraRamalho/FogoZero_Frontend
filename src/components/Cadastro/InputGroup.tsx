interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  helperText?: string;
}

export function InputGroup({
  label,
  icon,
  helperText,
  ...props
}: InputGroupProps) {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
        <input
          {...props}
          className={`w-full p-2.5 ${icon ? "pl-10" : "pl-3"} border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-gray-400`}
        />
      </div>
      {helperText && (
        <span className="text-[10px] text-gray-400">{helperText}</span>
      )}
    </div>
  );
}
