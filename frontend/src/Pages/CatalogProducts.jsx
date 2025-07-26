import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Pagination from '../Components/Pagination';
import ProductGrid from '../Components/Products';
import FiltersSidebar from './FiltersSidebar';

const CatalogProducts = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filters, setFilters] = useState({
    priceRange: [0, 2000000],
    selectedCategories: [],
    selectedSubCategories: [],
    selectedSizes: [],
    selectedMetals: [],
    selectedThemes: [],
    selectedPurposes: [],
    selectedFestivals: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/products`);
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        const flattenedVariants = result.flatMap(product =>
          product.ProductVariants.map(variant => ({
            ...variant,
            categories: JSON.parse(variant.categories || '[]'),
            subCategories: JSON.parse(variant.subCategories || '[]'),
            themes: JSON.parse(variant.themes || '[]'),
            purposes: JSON.parse(variant.purposes || '[]'),
            festivals: JSON.parse(variant.festivals || '[]'),
            sizes: JSON.parse(variant.sizes || '[]'),
            metal: JSON.parse(variant.metal || '[]'),
            price: JSON.parse(variant.price || '[]'),
            productId: product.id,
          }))
        );

        setAllProducts(flattenedVariants);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    const {
      selectedCategories,
      selectedSubCategories,
      selectedSizes,
      selectedMetals,
      selectedThemes,
      selectedPurposes,
      selectedFestivals,
      priceRange,
    } = filters;

    const result = allProducts.filter(variant => {
      const price = Math.min(...variant.price.map(p => parseFloat(p)));

      const matchesCategory = selectedCategories.length === 0 || variant.categories.some(cat => selectedCategories.includes(cat));
      const matchesSubCategory = selectedSubCategories.length === 0 || variant.subCategories.some(sub => selectedSubCategories.includes(sub));
      const matchesSize = selectedSizes.length === 0 || variant.sizes.some(size => selectedSizes.includes(size));
      const matchesMetal = selectedMetals.length === 0 || variant.metal.some(metal => selectedMetals.includes(metal));
      const matchesTheme = selectedThemes.length === 0 || variant.themes.some(theme => selectedThemes.includes(theme));
      const matchesPurpose = selectedPurposes.length === 0 || variant.purposes.some(purpose => selectedPurposes.includes(purpose));
      const matchesFestival = selectedFestivals.length === 0 || variant.festivals.some(festival => selectedFestivals.includes(festival));
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchesCategory && matchesSubCategory && matchesSize && matchesMetal && matchesTheme && matchesPurpose && matchesFestival && matchesPrice;
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [filters, allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const products = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFiltersChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className='pt-[150px]'>
      <Header />
      <div className="container lg:w-7xl mx-auto lg:my-10 mt-12">
        <div className="flex justify-between mx-10 items-center">
          <button className="text-[#AA8265] text-[12px] border py-1 px-4 cursor-pointer xl:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            FILTER
          </button>
        </div>

        <FiltersSidebar
          url={url}
          isFilterOpen={isFilterOpen}
          isScrolled={isScrolled}
          onFiltersChange={handleFiltersChange}
        />

        <ProductGrid products={products} />
      </div>

      {filteredProducts.length > 0 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}

      <Footer />
    </div>
  );
};

export default CatalogProducts;
