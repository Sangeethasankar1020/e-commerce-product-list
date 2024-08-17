// pages/Home.js
import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";

const initialProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "High quality product 1",
    img: "https://via.placeholder.com/150",
    price: 10,
    rating: 4.5,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 2,
    name: "Product 2",
    description: "High quality product 2",
    img: "https://via.placeholder.com/150",
    price: 20,
    rating: 4.0,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 3,
    name: "Product 3",
    description: "High quality product 3",
    img: "https://via.placeholder.com/150",
    price: 15,
    rating: 4.2,
    isNew: false,
    isStockOut: true,
  },
  {
    id: 4,
    name: "Product 4",
    description: "High quality product 4",
    img: "https://via.placeholder.com/150",
    price: 25,
    rating: 4.8,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 5,
    name: "Product 5",
    description: "High quality product 5",
    img: "https://via.placeholder.com/150",
    price: 12,
    rating: 4.3,
    isNew: false,
    isStockOut: true,
  },
  {
    id: 6,
    name: "Product 6",
    description: "High quality product 6",
    img: "https://via.placeholder.com/150",
    price: 18,
    rating: 4.1,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 7,
    name: "Product 7",
    description: "High quality product 7",
    img: "https://via.placeholder.com/150",
    price: 22,
    rating: 4.7,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 8,
    name: "Product 8",
    description: "High quality product 8",
    img: "https://via.placeholder.com/150",
    price: 17,
    rating: 4.4,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 9,
    name: "Product 9",
    description: "High quality product 9",
    img: "https://via.placeholder.com/150",
    price: 19,
    rating: 4.6,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 10,
    name: "Product 10",
    description: "High quality product 10",
    img: "https://via.placeholder.com/150",
    price: 14,
    rating: 4.5,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 11,
    name: "Product 11",
    description: "High quality product 11",
    img: "https://via.placeholder.com/150",
    price: 13,
    rating: 4.9,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 12,
    name: "Product 12",
    description: "High quality product 12",
    img: "https://via.placeholder.com/150",
    price: 28,
    rating: 4.0,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 13,
    name: "Product 13",
    description: "High quality product 13",
    img: "https://via.placeholder.com/150",
    price: 21,
    rating: 4.4,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 14,
    name: "Product 14",
    description: "High quality product 14",
    img: "https://via.placeholder.com/150",
    price: 16,
    rating: 4.2,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 15,
    name: "Product 15",
    description: "High quality product 15",
    img: "https://via.placeholder.com/150",
    price: 26,
    rating: 4.3,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 16,
    name: "Product 16",
    description: "High quality product 16",
    img: "https://via.placeholder.com/150",
    price: 20,
    rating: 4.5,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 17,
    name: "Product 17",
    description: "High quality product 17",
    img: "https://via.placeholder.com/150",
    price: 11,
    rating: 4.6,
  },
  {
    id: 18,
    name: "Product 18",
    description: "High quality product 18",
    img: "https://via.placeholder.com/150",
    price: 30,
    rating: 4.7,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 19,
    name: "Product 19",
    description: "High quality product 19",
    img: "https://via.placeholder.com/150",
    price: 27,
    rating: 4.8,
    isNew: true,
    isStockOut: false,
  },
  {
    id: 20,
    name: "Product 20",
    description: "High quality product 20",
    img: "https://via.placeholder.com/150",
    price: 29,
    rating: 4.9,
    isNew: false,
    isStockOut: true,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products);

  // to dispatch products to the redux store

  useEffect(() => {
    dispatch(setProducts(initialProducts)); // Set local products array to the Redux store
  }, [dispatch]);

  const goToFav = () => {
    navigate("/favorites");
  };
  const goToCart = () => {
    navigate("/cart");
  };
  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center mb-4">
        <a href="/" className="text-xl font-bold">
          Home
        </a>
        <div className="flex space-x-4">
          <div onClick={() => goToFav()} className="text-blue-500">
            Favorites
          </div>
          <div onClick={() => goToCart()} className="text-blue-500">
            Cart({cartItems.length})
          </div>
        </div>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
