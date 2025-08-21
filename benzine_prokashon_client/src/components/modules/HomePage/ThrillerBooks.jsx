import React from "react";
import useBooks from "../../../Hooks/useBooks";
import { useNavigate } from "react-router-dom";
import BookCard from "../Books/BookCard";

const ThrillerBooks = () => {
  const navigate = useNavigate();
  const { books, isLoading, error } = useBooks(
    1, // page
    6, // limit
    "", // search
    "desc", // sortOrder
    "", //sortBy
    "থ্রিলার" // genre
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading books</p>;
  if (!books.length) return <p>No Thriller books found.</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold mb-4">থ্রিলার বই</h2>
        <button
          onClick={() => navigate("/all-books?genre=থ্রিলার")}
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

export default ThrillerBooks;
