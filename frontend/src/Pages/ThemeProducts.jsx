import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ThemeProducts = () => {
  const { themeName } = useParams(); // URL se theme name le raha hai
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/products");
        const data = await res.json();

        const filtered = data.filter(
          (product) => product.theme && product.theme.toLowerCase() === themeName.toLowerCase()
        );

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchFilteredProducts();
  }, [themeName]);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">Products for theme: {themeName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            {/* Add image, price, etc. as needed */}
          </div>
        ))}
        {products.length === 0 && <p>No products found for this theme.</p>}
      </div>
    </div>
  );
};

export default ThemeProducts;
