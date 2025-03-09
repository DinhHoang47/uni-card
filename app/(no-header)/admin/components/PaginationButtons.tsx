import React from "react";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [1]; // Always include first page

    if (totalPages <= 5) {
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages); // Always include last page
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-1">
            ...
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
