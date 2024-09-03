// pages/Favorites.js
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Favourites = () => {
  const favoriteItems = useSelector((state) => state.favorites.items);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteItems.length ? (
          favoriteItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>
            No favorite items yet.
            <a href="/" className="text-blue-500">
              Go back to shopping
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
