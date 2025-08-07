// pages/CategoryProducts.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch(`http://localhost:8000/products?category=${categoryName}`);
        console.log(`Fetching products for category: ${categoryName}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">
        Products in <span className="text-blue-600">{categoryName}</span>
      </h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img src={product.image} alt={product.title} className="w-full h-40 object-cover mb-2" />
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
