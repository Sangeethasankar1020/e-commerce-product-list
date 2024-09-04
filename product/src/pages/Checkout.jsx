import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearOrderItems } from "../redux/checkoutSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const orderItems = useSelector((state) => state.checkOutProducts.orderItems);
  console.log(orderItems);
  const dispatch = useDispatch();

  useEffect(() => {
    // optionally clear items if needed on component mount
    // dispatch(clearOrderItems())
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order placed:", cartItems);
  };

  return (
    <div className="checkout-container p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded"
            placeholder="Enter your full name"
          ></input>
        </div>

        <div>
          <label className="block mb-2">Shipping Address</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded"
            placeholder="Enter your shipping address"
          ></input>
        </div>

        <div>
          <label className="block mb-2">Payment Method</label>
          <select className="w-full p-2 border rounded" required>
            <option value="">Select payment method</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">card Details</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded"
          ></input>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Place Order
        </button>
      </form>
      {/* order summary */}
      <h2 className="text-xl font-bold mt-8">Order Summary</h2>
      <ul className="mt-4">
        {orderItems?.map((item) => (
          <li key={item.id} className="flex justify-between py-2">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-lg font-bold">
        Total: ${cartItems.reduce((total, item) => total + item.price, 0)}
      </div>
    </div>
  );
};

export default Checkout;
