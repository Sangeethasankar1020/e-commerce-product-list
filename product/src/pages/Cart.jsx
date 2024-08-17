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
  if (cartItems.length === 0) {
    return <p>Your Cart is empty </p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItems.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      <div className="mt-4">
        <p className="text-xl font-semibold">
          Total: $
          {cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </p>
      </div>
    </div>
  );
};
export default Cart;
