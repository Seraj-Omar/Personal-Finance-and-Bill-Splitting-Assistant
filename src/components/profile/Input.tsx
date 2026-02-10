export default function Input({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xl font-medium">{label}</label>
      <input
        {...props}
        className="h-13 rounded-lg border-2 border-[#E0E0E0] px-4 outline-none focus:border-[#3447AA]"
      />
    </div>
  );
}
