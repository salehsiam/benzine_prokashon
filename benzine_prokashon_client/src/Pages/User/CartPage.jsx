import React from "react";
import { useCart } from "../../Provider/CartContext";
import { ShoppingCart } from "lucide-react";
import { getDiscountedPrice } from "../../lib/utils";

const CartPage = () => {
  const { cart, removeFromCart, updateQty } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + getDiscountedPrice(item) * item.qty,
    0
  );

  return (
    <div className="max-w-7xl mx-auto pt-32 px-2 md:px-4 lg:px-0">
      <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center">
        <ShoppingCart /> Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => {
            const discounted = getDiscountedPrice(item);
            return (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center md:gap-4">
                  <img
                    src={item.coverImage}
                    alt={item.productNameBn}
                    className="w-16 h-20 object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{item.productNameBn}</h3>
                    <p className="text-sm text-gray-600">{item.authorName}</p>

                    <div className="flex gap-2">
                      <span className="text-primary font-semibold">
                        ৳ {discounted}
                      </span>
                      {discounted < item.listPrice && (
                        <span className="line-through text-gray-500 text-sm">
                          ৳ {item.listPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Qty Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item._id, item.qty + 1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          <div className="mt-6 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>৳ {totalPrice}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
