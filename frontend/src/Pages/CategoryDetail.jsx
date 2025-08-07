import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [selectedGemId, setSelectedGemId] = useState(null);
    const [selectedMetalIndex, setSelectedMetalIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [personalization, setPersonalization] = useState('');
    const [wishlisted, setWishlisted] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    if (!state) return <div>Loading...</div>;

    const { product, categories, multiproduct, metals, sizes, prices, gemstoneImages } = state;

    const handleImageClick = () => {
        navigate("/product-detail", { state });
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setErrorMessages((prev) => ({ ...prev, size: '' }));
    };

    const handleMetalChange = (index) => {
        setSelectedMetalIndex(index);
    };

    const handleAddToCart = (buyNow = false) => {
        if (!selectedSize) {
            setErrorMessages({ size: 'Please select a size' });
            return;
        }
        // Logic to handle cart or buy
        if (buyNow) {
            navigate('/checkout', { state: { ...state, selectedSize, personalization } });
        } else {
            console.log('Added to cart:', { ...state, selectedSize, personalization });
        }
    };

    const toggleWishlist = () => {
        setWishlisted(!wishlisted);
    };

    const checkPincode = () => {
        alert('Checking delivery for pincode...');
    };

    return (
        <div className="flex flex-col md:flex-row container mx-auto px-5 py-10">
            {/* Left - Image */}
            <div className="w-full md:w-1/2 text-center">
                <img
                    src={state.image}
                    alt={state.name}
                    className="mx-auto w-full max-w-md cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={handleImageClick}
                />
            </div>

            {/* Right - Product Info */}
            <div className="w-full md:w-1/2 flex flex-col px-6 md:px-10 py-8 bg-[#F6F4F0]">
                <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-medium text-[#AA8265] mb-1">{product?.title}</h1>
                    <p className="text-2xl md:text-3xl font-bold text-[#5B3E38]">{categories?.join(', ')}</p>
                </div>

                {/* Ratings */}
                <div className="flex items-center mb-6">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                        ))}
                    </div>
                    <span className="text-red-500 ml-2">20 products sold in last 7 hours</span>
                </div>

                {/* Delivery */}
                <div className="mt-6">
                    <h3 className="font-semibold">Estimated Delivery Time</h3>
                    <div className="flex items-center mt-2">
                        <input type="text" placeholder="302005" className="border rounded-l p-2 w-full max-w-xs" />
                        <button className="bg-pink-600 text-white px-4 py-2 rounded-r" onClick={checkPincode}>
                            Check
                        </button>
                    </div>
                    <p className="text-gray-600 mt-3">Free Delivery by Monday, 31st March</p>
                </div>

                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div>6-Month Warranty</div>
                    <div>Easy 30 Day Return</div>
                    <div>Lifetime Plating</div>
                    <div>925 Fine Silver</div>
                </div>

                {/* Gemstone Selection */}
                {multiproduct?.length > 0 && (
                    <div className="mb-4 mt-6">
                        <h3 className="text-sm font-semibold mb-2">Gemstone Type</h3>
                        <div className="flex flex-wrap gap-2">
                            {multiproduct.map((metal, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <button
                                        onClick={() => navigate(`/product/${metal.productId}/${metal.id}`)}
                                        className={`w-16 h-16 border-2 rounded-md ${selectedGemId === metal.id ? 'border-[#AA8265]' : 'border-gray-300'}`}
                                    >
                                        <img
                                            src={gemstoneImages?.[metal.gemstone] || '/images/placeholder.png'}
                                            alt={metal.gemstone}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                    <span className="text-xs mt-1">{metal.gemstone}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Metal Selection */}
                {metals?.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-2">Metal Type</h3>
                        <div className="flex flex-wrap gap-2">
                            {metals.map((metal, index) => (
                                <button
                                    key={index}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center border 
                                        ${selectedMetalIndex === index ? 'bg-[#AA8265] text-white border-[#AA8265]' : 'border-[#AA8265] text-[#5B3E38]'}`}
                                    onClick={() => handleMetalChange(index)}
                                >
                                    {metal}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center my-6">
                    <span className="text-2xl md:text-3xl font-bold">${prices?.[selectedMetalIndex]}</span>
                    <span className="text-gray-500 line-through ml-3">
                        ${Math.round(parseFloat(prices?.[selectedMetalIndex]) * 1.1)}
                    </span>
                </div>

                {/* Size Dropdown */}
                {sizes?.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-2">Size</h3>
                        <select
                            className="w-full p-2 border border-[#AA8265] rounded-md bg-white text-[#5B3E38]"
                            value={selectedSize}
                            onChange={(e) => handleSizeSelect(e.target.value)}
                        >
                            <option value="">Select a size</option>
                            {sizes.map((size, index) => (
                                <option key={index} value={size}>{size}</option>
                            ))}
                        </select>
                        {errorMessages.size && (
                            <p className="text-red-500 text-sm mt-1">{errorMessages.size}</p>
                        )}
                    </div>
                )}

                {/* Personalization */}
                <div className="mb-6">
                    <label htmlFor="personalization" className="block font-medium text-[#5B3E38]">
                        Personalization (optional)
                    </label>
                    <input
                        type="text"
                        id="personalization"
                        value={personalization}
                        onChange={(e) => setPersonalization(e.target.value)}
                        placeholder="Enter your message (e.g. name, initials, etc.)"
                        className="mt-2 w-full p-2 border border-gray-300 rounded focus:ring-[#5B3E38] focus:outline-none"
                    />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <p className="text-[#5B3E38]">{product?.description || "Delivery in 15-20 days"}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => handleAddToCart(true)}
                        className="bg-white border border-pink-300 px-4 py-3 rounded hover:bg-pink-100 hover:scale-105 transition"
                    >
                        Buy Now
                    </button>
                    <button
                        onClick={() => handleAddToCart(false)}
                        className="bg-pink-500 text-white px-4 py-3 rounded hover:bg-pink-600 hover:scale-105 transition"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={toggleWishlist}
                        className={`hover:scale-105 ${wishlisted ? 'text-pink-500' : 'text-black'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetail;
