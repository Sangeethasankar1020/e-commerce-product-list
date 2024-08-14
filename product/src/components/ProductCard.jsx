// components/ProductCard.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToFavorites } from "../redux/favouritesSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const isFavorite = favoriteItems.some((item) => item.id === product.id);
  const isInCart = cartItems.some((item) => item.id === product.id);

  // add to favourite
  const handleAddToFavorties = () => {
    dispatch(addToFavorites(product));
  };

  // view product details

  const handleCardclick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-bold">${product.price}</p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">{product.rating} ★</span>
      </div>
      <button
        onClick={() => dispatch(addToCart(product))}
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${
          isInCart ? "bg-blue-300" : ""
        }`}
      >
        {isInCart ? "In Cart" : "Add to Cart"}
      </button>
      <button
        onClick={handleAddToFavorties}
        className={`mt-2 px-4 py-2 ${
          isFavorite ? "bg-red-500" : "bg-gray-300"
        } text-white rounded`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <button
        onClick={handleCardclick}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
