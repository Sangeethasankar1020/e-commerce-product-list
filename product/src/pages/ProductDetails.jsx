import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  console.log("Product ID from URL:", id);

  const product = useSelector((state) =>
    state.products.find((product) => product.id === parseInt(id))
  );

  console.log("product found", product);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      ></img>
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      <p className="text-yellow-500 mb-4">{product.rating}</p>
    </div>
  );
};

export default ProductDetails;
