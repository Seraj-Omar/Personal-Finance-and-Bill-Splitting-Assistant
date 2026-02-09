
export default function UpdateButton({ onClick }: { onClick: () => void }) {

  return (
    <button className="mt-10 w-full py-3 rounded-xl bg-[#3447AA] text-white font-medium "
      onClick={onClick}
    >
      Update changes
    </button>
  );
}
