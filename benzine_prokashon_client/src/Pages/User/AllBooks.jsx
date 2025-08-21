import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useBooks from "../../Hooks/useBooks";
import BookCard from "../../components/modules/Books/BookCard";
import GenreFilter from "../../components/modules/Books/GenreFilter";

const AllBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "asc"
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "price");
  const search = searchParams.get("search") || "";
  const genre = searchParams.get("genre") || "";
  const limit = 12;

  const { books, totalPages, currentPage, isLoading, error } = useBooks(
    page,
    limit,
    search,
    sortOrder,
    sortBy,
    genre
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
        <h2 className="text-2xl font-semibold mb-6">বই দেখুন</h2>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="border px-3 py-2 rounded-lg hidden sm:block"
            value={search}
            onChange={(e) => {
              updateSearchParams({ search: e.target.value, page: 1 });
            }}
          />

          {/* Price sort button */}
          <button
            onClick={() => {
              const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
              setSortOrder(newSortOrder);
              setSortBy("price");
              updateSearchParams({
                sortBy: "price",
                sortOrder: newSortOrder,
                page: 1,
              });
            }}
            className={`px-3 py-2 rounded-lg ${
              sortBy === "price" ? "bg-blue-400 text-white" : "bg-gray-200"
            }`}
          >
            Price {sortBy === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>

          {/* Time sort button */}
          <button
            onClick={() => {
              const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
              setSortOrder(newSortOrder);
              setSortBy("time");
              updateSearchParams({
                sortBy: "time",
                sortOrder: newSortOrder,
                page: 1,
              });
            }}
            className={`px-3 py-2 rounded-lg ${
              sortBy === "time" ? "bg-blue-400 text-white" : "bg-gray-200"
            }`}
          >
            {sortBy === "time"
              ? sortOrder === "asc"
                ? "Older ↑"
                : "Recent ↓"
              : "Sort by Time"}
          </button>
        </div>
      </div>
      <GenreFilter />
      {error ? (
        <p className="text-red-500">
          Error: {error.message || "Failed to load books"}
        </p>
      ) : isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : books?.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
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
      )}
    </div>
  );
};

export default AllBooks;
