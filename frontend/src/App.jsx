import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Pages/Cart";
import Checkout2 from "./Pages/Checkout-2";
import Checkout3 from "./Pages/Checkout-3";
import Checkout from "./Pages/Checkout";
import Contact from "./Pages/Contact";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import Oops from "./Pages/Oops";
import PopUp from "./Pages/PopUp";
import Product from "./Pages/Product";
import Register from "./Pages/Register";
import Search from "./Pages/Search";
import CatalogProducts from "./Pages/CatalogProducts";
import CustomJel from "./Pages/CustomJel";
import ProductDetails from "./Pages/ProductDetails";
// import Test from "./Pages/Test";
// import WishlistPage from "./Pages/WishlistPage";
import ProductVar from "./Pages/ProductVar"
import Aboutus from "./Pages/aboutus";
import Privacypolicy from "./Pages/Privacypolicy";
import TermsConditions from "./Pages/TermsConditions";
import CategoryDetail from './pages/CategoryDetail';
// import ProductDetail from './pages/ProductDetail';
import ThemeProducts from "./Pages/ThemeProducts";
import CategoryProducts from "./Pages/CategoryProducts";
import ProductList from "./Pages/ProductList";
const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-2" element={<Checkout2 />} />
        <Route path="/checkout-3" element={<Checkout3 />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/custom-jewelry" element={<CustomJel />} />
        <Route path="/*" element={<Oops />} />
        <Route path="/pop-up" element={<PopUp />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id/:variantId" element={<Product />} />
        <Route path="/product/:id/:variantId" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/catalog-products" element={<CatalogProducts />} />
        <Route path="/product" element={<Product/>}/>
        <Route path="/product-details" element={<ProductDetails/>}/>
        <Route path="/product-var" element={<ProductVar/>}/>
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/category-detail" element={<CategoryDetail />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/theme/:themeName" element={<ThemeProducts />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/category/:categoryName" element={<CategoryProducts />} />
        {/* <Route path="/wishlist" element={<WishlistPage/>}/> */}
      </Routes>
    </Router>
  );
};

export default App;
