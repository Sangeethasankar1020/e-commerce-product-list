// components/ProductCard.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { addToFavorites, removeFromFavorites } from "../redux/favouritesSlice";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const isFavorite = favoriteItems.some((item) => item.id === product.id);
  const isInCart = cartItems.some((item) => item.id === product.id);

  // add to favourite
  const handleAddToFavorties = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  // add to cart

  const handleAddCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };
  // view product details

  const handleCardclick = () => {
    // save product data to local storage
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="relative p-4 border rounded-lg shadow-lg overflow-hidden">
      {/* Tags */}
      {product.isNew && (
        <span className="absolute top-0 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded-br-lg z-10">
          New Product
        </span>
      )}
      {product.isStockOut && (
        <span
          className={`absolute ${
            product.isNew ? "mt-6" : "mt-0"
          } top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg z-10`}
        >
          Stock Out
        </span>
      )}

      {/* <img
        src={product.img}
        alt={product.name}
        className="w-full h-48 object-cover mb-4"
      /> */}
      {/* carousel for product images */}

      <Carousel showThumbs={false} infiniteLoop autoPlay>
        {product.img.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="w-full h-48 object-cover mb-4"
            />
          </div>
        ))}
      </Carousel>

      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-bold">${product.price}</p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">{product.rating} ★</span>
      </div>
      <button
        onClick={handleAddCart}
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
