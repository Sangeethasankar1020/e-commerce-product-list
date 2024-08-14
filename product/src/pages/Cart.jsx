// pages/Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.length;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {/* <div className="space-y-4">
        {cartItems.length ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-md"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-lg font-bold">
                  ${item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div> */}

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <div className="space-y-4">
          {cartItems.length ? (
            cartItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            <p>Your Cart is empty.</p>
          )}
        </div>
      </div>

      {totalItems > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Total :${totalPrice}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
