type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  textarea?: boolean;
  option?: string;
};

export default function InputField({
  label,
  placeholder,
  type = "text",
  icon,
  textarea,
  option,
}: Props) {
  return (
    <div>
      <label className="text-sm text-black mb-1 block">
        {label} <span className="text-[#AEAEAE]">{option}</span>
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        {textarea ? (
          <textarea
            placeholder={placeholder}
            className={`w-full p-4 rounded-2xl border-[.5px] border-[#E0E0E0]  bg-[#F9F9FA] outline-none resize-none h-28 text-[#AEAEAE] ${
              icon ? "pl-12" : ""
            }`}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            className={`w-full p-4 rounded-2xl border border-[#E0E0E0] bg-[#F9F9FA] outline-none text-[#AEAEAE] ${
              icon ? "pl-12" : ""
            }`}
          />
        )}
      </div>
    </div>
  );
}
