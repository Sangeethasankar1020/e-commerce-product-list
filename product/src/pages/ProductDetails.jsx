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

  // filter related products based on the same category

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id //exclude the current product
  );

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

      {/* related products */}

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">
            Related Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
              >
                <Carousel showThumbs={false} infiniteLoop autoPlay>
                  {relatedProduct.img.map((image, index) => (
                    <div key={index} className="bg-gray-100">
                      <img
                        src={image}
                        alt={`${relatedProduct.name} ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {relatedProduct.name}
                  </h4>
                  <p className="text-gray-600 mb-2">
                    {relatedProduct.description}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ${relatedProduct.price}
                  </p>
                  <a
                    href={`/product/${relatedProduct.id}`}
                    className="text-blue-500 hover:underline mt-2 block"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
