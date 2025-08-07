import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Rings",
    image: "/n-image/Rings.jpg",
    description: "Elegant rings for all occasions",
  },
  {
    name: "Charms",
    image: "/n-image/Charms.jpg",
    description: "Beautiful charms for bracelets",
  },
  {
    name: "Earrings",
    image: "/n-image/Earrings.jpg",
    description: "Stylish earrings for daily wear",
  },
  {
    name: "Bracelet",
    image: "/n-image/Bracelet.jpg",
    description: "Charming bracelets for every hand",
  },
  {
    name: "Necklaces",
    image: "/n-image/Necklaces.jpg",
    description: "Necklaces that shine",
  },
  {
    name: "New Arrival",
    image: "/n-image/New-Arrivals.jpg",
    description: "Latest additions to our collection",
  },
];

const CategoryPage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate("/category-detail", { state: category });
  };

  return (
    <section className="container mx-auto px-5 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">Shop By Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="cursor-pointer group"
            onClick={() => handleCategoryClick(cat)}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
            />
            <h3 className="text-center text-2xl font-semibold mt-2">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
