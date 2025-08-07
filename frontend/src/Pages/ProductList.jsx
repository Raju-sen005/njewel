// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../Components/Products";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const ProductList = () => {
    const [variants, setVariants] = useState([]);
    const location = useLocation();
    const url = import.meta.env.VITE_BACKEND_URL;
    
    useEffect(() => {
        const fetchProducts = async () => {
            const query = location.search; // like ?purpose=For%20Women&category=Ring

            try {
                const res = await fetch(`${url}/products${query}`);
                const data = await res.json();

                // Extract all ProductVariants from all matching products
                const extractedVariants = data.flatMap(product =>
                    product.ProductVariants.map(variant => ({
                        ...variant,
                        // Optional: safely parse array fields
                        price: parseSafeArray(variant.price),
                        metal: parseSafeArray(variant.metal),
                        sizes: parseSafeArray(variant.sizes),
                        images: parseSafeArray(variant.images),
                        productId: product.id,
                    }))
                );

                setVariants(extractedVariants);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            }
        };

        fetchProducts();
    }, [location.search]);

    // Helper function to parse stringified arrays safely
    const parseSafeArray = (data) => {
        try {
            return JSON.parse(data);
        } catch {
            return Array.isArray(data) ? data : [];
        }
    };

    return (
        <>
        <Header />
        <div className="container mx-auto py-6 px-4 mt-40">
            <h2 className="text-2xl font-bold mb-4">Filtered Products</h2>
            {variants.length > 0 ? (
                <ProductGrid products={variants} />
            ) : (
                <p>No products found.</p>
            )}
        </div>
        <Footer />
        </>
      
    );
};

export default ProductList;
