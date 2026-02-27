// src/components/Pagination.tsx
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Arrow */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2.5 rounded-xl border border-gray-100 disabled:opacity-20 hover:bg-[#F6F6F7] transition-all"
        aria-label="Previous page"
      >
        <HiChevronLeft size={20} className="text-[#1C1A1A]" />
      </button>

      {/* Numbered Buttons */}
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
              currentPage === page
                ? "bg-[#3447AA] text-white shadow-sm"
                : " hover:bg-[#f7f7fa] text-[#1C1A1A] "
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Arrow */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2.5 rounded-xl border border-gray-100 disabled:opacity-20 hover:bg-[#F6F6F7] transition-all"
        aria-label="Next page"
      >
        <HiChevronRight size={20} className="text-[#1C1A1A]" />
      </button>
    </div>
  );
}