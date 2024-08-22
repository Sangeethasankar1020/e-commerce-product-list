import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const products = useSelector((state) => state.products.products);

  if (!Array.isArray(products)) {
    // return <div>Loading...</div>;
    console.error("Expected products to be array but got:", products);
    return <p>Loading</p>;
  }
  const product = products.find((product) => product.id === parseInt(id)); // Find the product by ID

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* <img
        src={product.img}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      ></img> */}
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
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      <p className="text-yellow-500 mb-4">{product.rating}</p>
    </div>
  );
};

export default ProductDetails;
