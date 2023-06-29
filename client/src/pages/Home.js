import React from "react";
// import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

import UpdateProfile from '../components/UpdateProfile';

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      {/* <ProductList /> */}
      <UpdateProfile />
      <Cart />
    </div>
  );
};

export default Home;
