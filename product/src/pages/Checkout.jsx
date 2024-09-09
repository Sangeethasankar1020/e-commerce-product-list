import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearOrderItems,
  removeOrderItem,
  updateOrderItemQuantity,
} from "../redux/checkoutSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { increaseStock, decreaseStock } from "../redux/stockSlice";

const Checkout = () => {
  const orderItems = useSelector((state) => state.checkOutProducts.orderItems);
  const stock = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    const existingItem = orderItems.find((item) => item.id === itemId);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        dispatch(
          updateOrderItemQuantity({
            id: itemId,
            quantity: existingItem.quantity - 1,
          })
        );
        dispatch(increaseStock({ productId: itemId, quantity: 1 }));
      } else {
        dispatch(removeOrderItem(itemId));
        dispatch(increaseStock({ productId: itemId, quantity: 1 }));
      }
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    const existingItem = orderItems.find((item) => item.id === itemId);
    if (existingItem) {
      const stockCount = stock[itemId]?.stock || 0;
      if (existingItem.quantity < stockCount) {
        dispatch(
          updateOrderItemQuantity({
            id: itemId,
            quantity: existingItem.quantity + 1,
          })
        );
        dispatch(decreaseStock({ productId: itemId, quantity: 1 }));
      } else {
        alert("No more stock available!");
      }
    }
  };

  const handleClearOrder = () => {
    orderItems.forEach((item) => {
      dispatch(increaseStock({ productId: item.id, quantity: item.quantity }));
    });
    dispatch(clearOrderItems());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order placed:", orderItems);
    // Additional order submission logic
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
          />
        </div>

        <div>
          <label className="block mb-2">Shipping Address</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded"
            placeholder="Enter your shipping address"
          />
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
          <label className="block mb-2">Card Details</label>
          <input type="text" required className="w-full p-2 border rounded" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Place Order
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8">Order Summary</h2>
      <ul className="mt-4">
        {orderItems.map((item) => (
          <li key={item.id} className="flex justify-between py-2 items-center">
            <span>{item.name}</span>
            <span className="flex items-center">
              ${item.price} x {item.quantity}
            </span>
            <div className="ml-2 flex items-center">
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button
                onClick={() => handleIncreaseQuantity(item.id)}
                className="ml-2 text-green-500"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      {orderItems.length > 0 && (
        <button
          onClick={handleClearOrder}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear All
        </button>
      )}

      <div className="mt-4 text-lg font-bold">
        Total: $
        {orderItems
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)}{" "}
        {/* Format to 2 decimal places */}
      </div>
    </div>
  );
};

export default Checkout;
