import { ShoppingCart, Heart } from "lucide-react";
import React from "react";
import { useCart } from "../../../Provider/CartContext";
import { getDiscountedPrice, toBanglaNumber } from "../../../lib/utils";

const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  const discountedPrice = getDiscountedPrice(book);

  return (
    <div className="bg-white w-48 shadow-md hover:shadow-lg transition p-4 flex flex-col">
      {/* Thumbnail */}
      <div className="mx-auto h-44 bg-gray-100 overflow-hidden mb-4">
        <img
          src={book?.coverImage}
          alt={book?.productNameEn}
          className="h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-md font-bold mb-1 line-clamp-1">
          {book?.productNameBn}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{book?.translatorName}</p>

        <div className="mt-auto">
          <div className="mt-auto">
            <div className="flex gap-1 items-center mb-2">
              <span className="font-semibold text-base">
                ৳ {toBanglaNumber(discountedPrice)}
              </span>
              {book.listPrice && (
                <span className="font-normal text-sm line-through pl-1">
                  ৳ {toBanglaNumber(Math.round(book?.listPrice))}
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              // onClick={() => addToCart(book)}
              className="bg-blue-400 text-white w-full px-2 py-1 rounded-md flex justify-center items-center gap-1 text-sm hover:bg-primary/90"
            >
              Details
            </button>
            <button
              onClick={() => addToCart(book)}
              className="bg-blue-400 text-white w-full px-2 py-1 rounded-md flex justify-center items-center gap-1 text-sm hover:bg-primary/90"
            >
              Cart
            </button>

            {/* <button
              onClick={() => setWishlist(!wishlist)}
              className={`p-2 rounded-full ${
                wishlist ? "text-red-500" : "text-gray-500"
              } hover:bg-gray-100`}
            >
              <Heart size={18} />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
