import { ShoppingCart, Heart } from "lucide-react";
import React, { useState } from "react";

const BookCard = ({ book }) => {
  // const [wishlist, setWishlist] = useState(false);

  // const handleWishlist = () => {
  //   setWishlist(!wishlist);
  //   onAddToWishlist(book);
  // };

  return (
    <div className="bg-white w-48 shadow-md hover:shadow-lg transition p-4 flex flex-col relative">
      {/* Thumbnail */}
      <div className="mx-auto h-44 bg-gray-100 overflow-hidden mb-4">
        <img
          src={book?.coverImage}
          alt={book?.productNameEn}
          className="h-full object-cover"
        />
      </div>

      {/* Book Info */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-md font-bold mb-1 line-clamp-1">
          {book?.productNameBn}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{book?.authorName}</p>

        <div className="mt-auto">
          <div className="flex gap-1 items-center mb-2">
            <span className="font-semibold text-base">৳ {book?.listPrice}</span>
            {book.listPrice && (
              <span className="font-normal text-sm line-through pl-1">
                ৳ {Math.round(book?.listPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="">
            {/* Add to Cart */}
            <button
              // onClick={() => onAddToCart(book)}
              className="bg-blue-400 text-white w-full px-2 py-1 flex items-center justify-center gap-1 text-sm hover:bg-primary/90"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>

            {/* Wishlist */}
            <button
              // onClick={handleWishlist}
              // className={`p-2 rounded-full ${
              //   wishlist ? "text-red-500" : "text-gray-500"
              // } hover:bg-gray-100`}
              className="absolute top-4 right-2 p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
