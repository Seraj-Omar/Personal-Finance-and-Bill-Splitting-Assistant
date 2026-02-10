export default function FilterButton({
  children,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-12 py-2 rounded-xl text-sm font-medium transition
        ${
          active
            ? "bg-[#3447AA] text-white shadow"
            : "text-gray-600 hover:bg-white"
        }`}
    >
      {children}
    </button>
  );
}
