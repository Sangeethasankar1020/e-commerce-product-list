import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import { increaseStock, decreaseStock, setStock } from "../redux/stockSlice";
import { addOrderItem } from "../redux/checkoutSlice";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stock = useSelector((state) => state.stock);
  const product = products?.find((product) => product.id === parseInt(id)); // Find the product by ID

  useEffect(() => {
    if (product) {
      dispatch(setStock({ productId: product.id, stock: product.stock })); // Set stock count for the selected product
    }
  }, [product, dispatch]);

  if (!Array.isArray(products)) {
    console.error("Expected products to be array but got:", products);
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  // Filter related products based on the same category
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id // Exclude the current product
  );

  const handleBuyNow = () => {
    const currentStock = stock[product.id]?.stock || 0; // Use stock state
    if (currentStock > 0) {
      dispatch(addOrderItem(product));
      dispatch(decreaseStock({ productId: product.id, quantity: 1 }));
      navigate("/checkout");
    } else {
      alert("Out of stock!");
    }
  };

  return (
    <div className="container mx-auto p-4">
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
      <p className="text-yellow-500 mb-4">Rating: {product.rating}</p>

      <div className="mb-4">
        <button
          className="px-3 py-2 bg-gray-200"
          onClick={() => {
            if (stock[product.id]?.count > 0) {
              dispatch(decreaseStock({ productId: product.id, quantity: 1 }));
            }
          }}
        >
          -
        </button>
        <span className="mx-4 text-xl">{stock[product.id]?.count || 0}</span>
        <button
          className="px-3 py-2 bg-orange-500 text-white rounded"
          onClick={() => {
            if (stock[product.id]?.count < product.stock) {
              dispatch(increaseStock({ productId: product.id, quantity: 1 }));
            }
          }}
        >
          +
        </button>

        <p className="text-sm px-4 py-2 bg-orange-500 w-28 m-3">
          In Stock: {product.stock}
        </p>
      </div>

      <button
        onClick={handleBuyNow}
        className="mt-2 px-4 py-2 bg-orange-500 text-white rounded"
        disabled={stock[product.id]?.count === 0 || product.isStockout}
      >
        Buy Now
      </button>

      {/* Related Products */}
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
