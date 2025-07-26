import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { useState, useEffect } from "react";

const ProductGrid = ({ products }) => {
    const url = import.meta.env.VITE_BACKEND_URL;

    const { addToCart } = useCart();
    const [selectedSizes, setSelectedSizes] = useState({});
    const [selectedMetals, setSelectedMetals] = useState({});
    const [mainImages, setMainImages] = useState({});
    const [errorMessages, setErrorMessages] = useState({});
    const [currentPrices, setCurrentPrices] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const initialMetals = {};
        const initialPrices = {};

        products.forEach(variant => {
            if (Array.isArray(variant.metal) && variant.metal.length > 0) {
                initialMetals[variant.id] = variant.metal[0];
                initialPrices[variant.id] = variant.price?.[0] || 0;
            }
        });

        setSelectedMetals(initialMetals);
        setCurrentPrices(initialPrices);
    }, [products]);

    const handleThumbnailClick = (variantId, image) => {
        setMainImages(prev => ({ ...prev, [variantId]: image }));
    };

    const handleSizeSelect = (variantId, e) => {
        const size = e.target.value;
        setSelectedSizes(prev => ({ ...prev, [variantId]: size }));
        setErrorMessages(prev => ({ ...prev, [variantId]: null }));
    };

    const handleMetalSelect = (variantId, metal) => {
        const variant = products.find(p => p.id === variantId);

        if (variant) {
            setSelectedMetals(prev => ({ ...prev, [variantId]: metal }));

            const metalIndex = variant.metal.indexOf(metal);

            if (metalIndex !== -1 && variant.price && variant.price[metalIndex] !== undefined) {
                setCurrentPrices(prev => ({ ...prev, [variantId]: variant.price[metalIndex] }));
            }
        }
    };

    const handleAddToCart = (variant) => {
        if (!selectedSizes[variant.id] && variant.sizes?.length > 0) {
            setErrorMessages(prev => ({ ...prev, [variant.id]: "Please select a size" }));
            return;
        }

        const metalIndex = variant.metals?.indexOf(selectedMetals[variant.id]) || 0;
        const price = variant.prices?.[metalIndex] || 0;

        addToCart(
            variant.productId,
            variant.id,
            selectedSizes[variant.id] || null,
            1,
            price,
            variant.title,
            Array.isArray(variant.images) ? variant.images[0] : variant.images,
            selectedMetals[variant.id] || null
        );
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:ml-[200px]">
            {products && products.map((variant) => {
                const images = Array.isArray(variant.images) ? variant.images : [variant.images];
                const currentMainImage = mainImages[variant.id] || images[0];
                const errorMessage = errorMessages[variant.id];
                const currentPrice = currentPrices[variant.id] || 0;

                return (
                    <div
                        key={variant.id}
                        className="relative p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition"
                        onClick={() => navigate(`/product/${variant.productId}/${variant.id}`)}
                    >
                        {/* Product Image */}
                        <div className="block bg-[#F6F4F0] h-[350px] overflow-hidden rounded-lg">
                            <img
                                alt={variant.title}
                                className="h-full w-full object-cover bg-[#E9E2D8] rounded-lg"
                                src={url + "/uploads/" + currentMainImage}
                            />
                        </div>

                        <div className="mt-4">
                            {/* Image Thumbnails */}
                            {images.length > 0 && (
                                <div className="flex space-x-2 my-2">
                                    {images.slice(0, 3).map((image, index) => (
                                        <img
                                            key={index}
                                            src={url + "/uploads/" + image}
                                            alt={variant.title}
                                            className={`w-10 h-10 rounded-md border cursor-pointer ${
                                                currentMainImage === image ? 'border-[#AA8265] border-2' : 'border-gray-300'
                                            }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleThumbnailClick(variant.id, image);
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Product Info */}
                            {variant.rating > 4.5 && (
                                <p className="text-sm text-red-600 font-semibold">BEST SELLER</p>
                            )}
                            <h2 className="text-lg font-bold text-gray-800">{variant.title}</h2>
                            <p className="text-sm text-gray-600">{variant.description}</p>

                            {/* Price Display */}
                            <div className="mt-2">
                                <p className="text-xl font-semibold text-gray-900">
                                    {currentPrice.toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 0
                                    })}
                                </p>
                            </div>

                            {/* Optional: Show error */}
                            {errorMessage && (
                                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductGrid;
