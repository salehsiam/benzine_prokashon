import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useBooks from "../../Hooks/useBooks";
import BookCard from "../../components/modules/Books/BookCard";

const AllBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "asc"
  );
  const search = searchParams.get("search") || "";
  const limit = 12;

  const { books, totalPages, currentPage, isLoading, error } = useBooks(
    page,
    limit,
    search,
    sortOrder
  );

  const updateSearchParams = (newParams) => {
    const params = Object.fromEntries(searchParams);
    setSearchParams({ ...params, ...newParams });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pt-32 px-2 md:px-0 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold mb-6">All Books</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="border px-3 py-2 rounded"
            value={search}
            onChange={(e) => {
              console.log("AllBooks updating search:", e.target.value);
              updateSearchParams({ search: e.target.value, page: 1 });
            }}
          />
          <button
            onClick={() => {
              const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
              console.log("Toggling sortOrder to:", newSortOrder);
              setSortOrder(newSortOrder);
              updateSearchParams({ sortOrder: newSortOrder, page: 1 });
            }}
            className="px-3 py-2 bg-blue-400 text-white rounded"
          >
            Price {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {error ? (
        <p className="text-red-500">
          Error: {error.message || "Failed to load books"}
        </p>
      ) : isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : books?.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            const newPage = page - 1;
            setPage(newPage);
            updateSearchParams({ page: newPage });
          }}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => {
              setPage(num);
              updateSearchParams({ page: num });
            }}
            className={`px-3 py-1 rounded ${
              currentPage === num
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            const newPage = page + 1;
            setPage(newPage);
            updateSearchParams({ page: newPage });
          }}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBooks;
