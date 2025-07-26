import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const Search = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/cart");
  };
  const [searchTerm, setSearchTerm] = useState("");
  const products = [
    {
      id: 1,
      name: "Bar Earrings",
      price: 64.99,
      discount: 64.99,
      image: "images/Untitled (12) 1.png",
    },
    {
      id: 2,
      name: "Geometric Necklaces",
      price: 159.99,
      discount: 64.99,
      image: "images/Untitled (18) 1.png",
    },
    {
      id: 3,
      name: "Viking Runes",
      price: 74.99,
      discount: 64.99,
      image: "images/Untitled (19) 1.png",
    },
    {
      id: 4,
      name: "Thor’s Hammer Pendants",
      price: 54.99,
      discount: 64.99,
      image: "images/Untitled (21) 1.png",
    },
  ];
  //filter
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //
  return (
    <>
      <div className='pt-[150px]'>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <div className="container lg:w-7xl mx-auto lg:my-10 mt-4">
          <div className="lg:ms-8 items-baseline sm:w-2xl ms-8 my-3">
            <i className="bi md:text-[36px] text-[20px] bi-search" />
            <input
              type="text"
              className="outline-none md:text-[36px] text-[20px] text-[#D5C4B3] md:ms-4"
              placeholder="SEARCH"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex justify-between lg:mx-10 items-baseline md:mx-8 ms-8">
            <h2 className="text-[#121212] text-[24px] md:text-[36px] font-bold">TOP PICKS FOR YOU</h2>
            <Link to="#" className="text-[#906951] text-[16px] hidden md:block">VIEW MORE <i className="bi bi-arrow-right" /></Link>
          </div>
          <div className="flex flex-wrap m-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative lg:w-1/4 md:w-1/3 p-4 w-full box">
                <Link className="block relative bg-[#F6F4F0] h-[350px] overflow-hidden">
                  <img alt={product.name} className="h-full w-full block bg-[#E9E2D8]" src={product.image} />
                </Link>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 font-semibold">BEST SELLER</p>
                  <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                  <p className="text-xl font-semibold text-gray-900 mt-2">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* footer section */}
        <Footer />
      </div>

    </>
  );
};

export default Search;
