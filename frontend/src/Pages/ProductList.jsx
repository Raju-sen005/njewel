// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            const query = location.search; // ?type=xyz
            try {
                const res = await fetch(`http://localhost:8000/products/api/v1/${query}`);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            }
        };
        fetchProducts();
    }, [location.search]);

    return (
        <div className="container mx-auto py-6">
            <h2 className="text-2xl font-bold mb-4">Filtered Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product, index) => (
                    <div key={index} className="border p-4 rounded">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
                        <h4 className="text-lg">{product.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
