// pages/Home.js
import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";

const initialProducts = [
  {
    id: 1,
    name: "Electronics Gadget 1",
    description: "High-quality electronics gadget for daily use.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Electronics+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Electronics+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Electronics+1",
    ],
    price: 10,
    rating: 4.5,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Electronics Gadget 2",
    description: "Advanced electronics gadget with multiple features.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Electronics+2",
      "https://via.placeholder.com/150/98FB98/000000?text=Electronics+2",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Electronics+2",
    ],
    price: 15,
    rating: 4.7,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Electronics Gadget 3",
    description: "Compact electronics gadget suitable for travel.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Electronics+3",
      "https://via.placeholder.com/150/98FB98/000000?text=Electronics+3",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Electronics+3",
    ],
    price: 8,
    rating: 4.0,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Electronics",
  },
  {
    id: 4,
    name: "Home Appliance 1",
    description: "Energy-efficient home appliance.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Home+Appliance+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Home+Appliance+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Home+Appliance+1",
    ],
    price: 20,
    rating: 4.0,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Home Appliance",
  },
  {
    id: 5,
    name: "Fashion Item 1",
    description: "Stylish fashion item for modern wear.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Fashion+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Fashion+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Fashion+1",
    ],
    price: 15,
    rating: 4.2,
    stock: 8,
    isNew: false,
    isStockOut: true,
    category: "Fashion",
  },
  {
    id: 6,
    name: "Beauty Product 1",
    description: "Natural beauty product for skincare.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Beauty+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Beauty+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Beauty+1",
    ],
    price: 25,
    rating: 4.8,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Beauty",
  },
  {
    id: 7,
    name: "Sports Equipment 1",
    description: "Durable sports equipment for athletes.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Sports+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Sports+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Sports+1",
    ],
    price: 30,
    rating: 4.7,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Sports",
  },
  {
    id: 8,
    name: "Furniture Item 1",
    description: "Stylish furniture for home decor.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Furniture+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Furniture+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Furniture+1",
    ],
    price: 50,
    rating: 4.3,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Furniture",
  },
  {
    id: 9,
    name: "Book 1",
    description: "Inspirational book to boost your motivation.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Book+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Book+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Book+1",
    ],
    price: 10,
    rating: 4.9,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Books",
  },
  {
    id: 10,
    name: "Kitchen Appliance 1",
    description: "Efficient kitchen appliance for quick cooking.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Kitchen+Appliance+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Kitchen+Appliance+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Kitchen+Appliance+1",
    ],
    price: 35,
    rating: 4.6,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Kitchen",
  },
  {
    id: 11,
    name: "Toy 1",
    description: "Fun and safe toy for children.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Toy+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Toy+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Toy+1",
    ],
    price: 12,
    rating: 4.1,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Toys",
  },
  {
    id: 12,
    name: "Gardening Tool 1",
    description: "Essential gardening tool for home use.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Gardening+Tool+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Gardening+Tool+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Gardening+Tool+1",
    ],
    price: 18,
    rating: 4.4,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Gardening",
  },
  {
    id: 13,
    name: "Electronics Gadget 4",
    description: "Portable electronics gadget with long battery life.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Electronics+4",
      "https://via.placeholder.com/150/98FB98/000000?text=Electronics+4",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Electronics+4",
    ],
    price: 22,
    rating: 4.5,
    stock: 8,
    isNew: false,
    isStockOut: true,
    category: "Electronics",
  },
  {
    id: 14,
    name: "Health Product 1",
    description: "Premium health product for everyday wellness.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Health+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Health+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Health+1",
    ],
    price: 40,
    rating: 4.6,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Health",
  },
  {
    id: 15,
    name: "Outdoor Gear 1",
    description: "Durable outdoor gear for adventure enthusiasts.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Outdoor+Gear+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Outdoor+Gear+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Outdoor+Gear+1",
    ],
    price: 60,
    rating: 4.7,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Outdoor",
  },
  {
    id: 16,
    name: "Pet Supplies 1",
    description: "High-quality pet supplies for your beloved pets.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Pet+Supplies+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Pet+Supplies+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Pet+Supplies+1",
    ],
    price: 14,
    rating: 4.3,
    stock: 8,
    isNew: false,
    isStockOut: true,
    category: "Pet Supplies",
  },
  {
    id: 17,
    name: "Fashion Item 2",
    description: "Trendy fashion item for casual wear.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Fashion+2",
      "https://via.placeholder.com/150/98FB98/000000?text=Fashion+2",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Fashion+2",
    ],
    price: 20,
    rating: 4.5,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Fashion",
  },
  {
    id: 18,
    name: "Jewelry Item 1",
    description: "Elegant jewelry for special occasions.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Jewelry+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Jewelry+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Jewelry+1",
    ],
    price: 75,
    rating: 4.9,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Jewelry",
  },
  {
    id: 19,
    name: "Gadget Accessory 1",
    description: "Essential gadget accessory for tech enthusiasts.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Gadget+Accessory+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Gadget+Accessory+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Gadget+Accessory+1",
    ],
    price: 12,
    rating: 4.4,
    stock: 8,
    isNew: false,
    isStockOut: true,
    category: "Accessories",
  },
  {
    id: 20,
    name: "Stationery 1",
    description: "Premium stationery for office and school use.",
    img: [
      "https://via.placeholder.com/150/87CEEB/000000?text=Stationery+1",
      "https://via.placeholder.com/150/98FB98/000000?text=Stationery+1",
      "https://via.placeholder.com/150/FFDAB9/000000?text=Stationery+1",
    ],
    price: 5,
    rating: 4.1,
    stock: 8,
    isNew: true,
    isStockOut: false,
    category: "Stationery",
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
  const goToAccount = () => navigate("/account");

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
          <div onClick={goToAccount} className="text-blue-500">
            Account
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
