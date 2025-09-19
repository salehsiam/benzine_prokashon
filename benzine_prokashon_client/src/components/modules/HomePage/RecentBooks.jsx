import React from "react";
import { useNavigate } from "react-router-dom";
import useBooks from "../../../Hooks/useBooks";
import BookCard from "../Books/BookCard";
import { Skeleton } from "../../ui/skeleton";

const RecentBooks = () => {
  const navigate = useNavigate();
  const { books, isLoading, error } = useBooks(
    1, // page
    6, // limit
    "", // search
    "asc", // sortOrder
    "Recent", // sortBy
    "" // genre
  );

  // Skeleton loader (mimics BookCard layout)
  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold mb-4">সাম্প্রতিক বই</h2>
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-lg" /> {/* image */}
              <Skeleton className="h-5 w-3/4 rounded-lg" /> {/* title */}
              <Skeleton className="h-4 w-1/2 rounded-lg" /> {/* author/price */}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p>Error loading books</p>;
  if (!books.length) return <p>No recent books found.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold mb-4">সাম্প্রতিক বই</h2>
        <button
          onClick={() => navigate("/all-books")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Show All
        </button>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default RecentBooks;
