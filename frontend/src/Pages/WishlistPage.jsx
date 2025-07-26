import React, { useState } from "react";
import Fancybox from "./Fancybox";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

const WishlistPage = () => {
  const [wishlistProducts] = useState([
    {
      id: 1,
      name: "Elegant Gold Necklace",
      image: "/images/jewel1.jpg",
      price: "₹12,999",
      description: "A beautifully crafted necklace perfect for weddings.",
    },
    {
      id: 2,
      name: "Diamond Ring",
      image: "/images/jewel2.jpg",
      price: "₹19,499",
      description: "Exquisite diamond ring with intricate detailing.",
    },
    {
      id: 3,
      name: "Ruby Pendant Set",
      image: "/images/jewel3.jpg",
      price: "₹8,999",
      description: "Elegant pendant set with shining ruby stones.",
    },
  ]);

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    document.getElementById("quickViewModal").showModal();
  };

  return (
    <div className="container py-10 px-5 mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-8">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md relative group"
          >
            <Fancybox>
              <a
                data-fancybox="gallery"
                href={product.image}
                className="block overflow-hidden rounded"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-105 duration-300"
                />
              </a>
            </Fancybox>
            <div className="mt-4">
              <h3 className="text-xl font-medium">{product.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{product.description}</p>
              <p className="text-lg font-semibold text-pink-600 mt-2">
                {product.price}
              </p>
            </div>
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-4">
                <button
                  className="bg-white text-gray-700 p-2 rounded-full shadow hover:text-pink-600"
                  onClick={() => openQuickView(product)}
                >
                  <FaSearch />
                </button>
                <button className="bg-white text-gray-700 p-2 rounded-full shadow hover:text-pink-600">
                  <FaHeart />
                </button>
                <button className="bg-white text-gray-700 p-2 rounded-full shadow hover:text-pink-600">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {quickViewProduct && (
        <dialog id="quickViewModal" className="modal">
          <div className="modal-box w-11/12 max-w-3xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <Fancybox>
                  <a
                    data-fancybox="quickview"
                    href={quickViewProduct.image}
                    className="block overflow-hidden rounded"
                  >
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="w-full h-auto object-cover"
                    />
                  </a>
                </Fancybox>
              </div>
              <div className="md:w-1/2 md:pl-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {quickViewProduct.name}
                </h3>
                <p className="text-gray-500 mb-4">
                  {quickViewProduct.description}
                </p>
                <p className="text-lg font-bold text-pink-600 mb-4">
                  {quickViewProduct.price}
                </p>
                <div className="flex gap-4">
                  <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
                    Add to Cart
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <form method="dialog" className="mt-4 text-right">
              <button className="btn">Close</button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default WishlistPage;
