import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"; // 👈 URL se id lene ke liye
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Product = () => {
  const { id } = useParams(); // productId URL se mil raha hai
  const [product, setProduct] = useState(null);
  const [selectedGem, setSelectedGem] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const mainSlider = useRef(null);

  // Dummy data fetch simulation (replace with API call)
  useEffect(() => {
    // 👇 Replace this with your actual API fetch
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/products/${id}.json`); // or your API endpoint
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="p-6 text-center">Loading product...</div>;
  }

  const mainSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
  };

  const thumbSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const gemstones = product.gemstones || [];

  return (
    <section>
      <div className="flex flex-col md:flex-row w-full">
        {/* Images Section */}
        <div className="w-full md:w-1/2 p-4">
          <Slider ref={mainSlider} {...mainSettings}>
            {product.images.map((src, index) => (
              <div key={`main-${index}`}>
                <img src={src} alt={`Product ${index + 1}`} className="w-full rounded" />
              </div>
            ))}
          </Slider>

          <Slider {...thumbSettings} className="mt-4">
            {product.images.map((src, index) => (
              <div key={`thumb-${index}`} className="px-1">
                <img
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => mainSlider.current.slickGoTo(index)}
                  className={`w-20 h-20 object-cover cursor-pointer mx-auto border-2 rounded transition-all duration-200 ${currentSlide === index
                    ? "border-pink-500"
                    : "border-transparent"
                    }`}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-3xl font-semibold mt-4 mb-5">{product.title}</h2>
          <div className="text-red-500 mb-3">{product.soldInfo}</div>

          {/* Delivery */}
          <div className="mb-4">
            <h3 className="font-semibold">Estimated Delivery Time</h3>
            <input placeholder="302005" className="border p-2 mr-2 rounded w-1/2" />
            <button className="bg-pink-600 text-white px-4 py-2 rounded">Check</button>
            <p className="text-gray-600 mt-3">Free Delivery by {product.deliveryDate}</p>
          </div>

          {/* Warranty & Material */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div>6-Month Warranty</div>
            <div>Easy 30 Day Return</div>
            <div>Lifetime Plating</div>
            <div>925 Fine Silver</div>
          </div>

          {/* Gemstone Selection */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Gemstone</h3>
            <div className="flex flex-wrap gap-2">
              {gemstones.map((gem) => (
                <button
                  key={gem.name}
                  onClick={() => setSelectedGem(gem.name)}
                  className={`border p-2 rounded text-[12px] ${selectedGem === gem.name ? "border-pink-500" : "border-gray-300"}`}
                >
                  <img src={gem.image} className="w-10 h-10 m-auto" alt={gem.name} />
                  {gem.name}
                </button>
              ))}
            </div>
          </div>

          {/* Material (Dynamic) */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Material</h3>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((material, index) => (
                <button key={index} className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                  {material}
                </button>
              ))}
            </div>
          </div>

          {/* Size Dropdown */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Size</h3>
            <select className="px-2 py-1 border rounded">
              {product.sizes.map((size, i) => (
                <option key={i}>{size}</option>
              ))}
            </select>
          </div>

          {/* Personalization */}
          <div className="my-3">
            <h3 className="font-medium text-[15px]">Add your Personalization (optional)</h3>
            <p className="text-gray-500 text-[13px] mb-2">Personalization: Name, Date or Message</p>
            <input className="border px-3 py-2 rounded w-1/2" type="text" />
          </div>

          {/* Gift Wrap */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="gift-wrap" className="mr-2" />
            <label htmlFor="gift-wrap" className="text-sm">Add gift wrap to your order (₹50)</label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="bg-white border border-pink-300 px-4 py-3 rounded hover:bg-pink-100">Buy Now</button>
            <button className="bg-pink-500 text-white px-4 py-3 rounded hover:bg-pink-600">Add to Cart</button>
            <button className="hover:scale-105">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;