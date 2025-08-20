import React from "react";
import useBooks from "../../Hooks/useBooks";
import BookCard from "../../components/modules/Books/BookCard";

const AllBooks = () => {
  const { books, refetch, isLoading } = useBooks();

  return (
    <div className="pt-28 px-2 md:px-0 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">All Books</h2>

      {isLoading ? (
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
    </div>
  );
};

export default AllBooks;
