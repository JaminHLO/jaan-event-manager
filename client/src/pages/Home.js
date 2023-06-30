import React from "react";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";
import teamwork from "../images/teamwork.png";
// import EventMap from "../components/EventMap";


const Home = () => {
  return (
    <div className="container">
      {/* <CategoryMenu /> */}
      {/* <ProductList /> */}
      {/* <Cart />  */}

      <div className="hero flex items-center pl-40">
        <div className="bg-slate-100 h-80 w-80 rounded-full flex justify-center items-center">
          <div className="flex flex-col text-center">
            <h1 className="text-2xl font-bold">Sports Connect</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
      <div className="mid-page bg-slate-100 w-screen flex flex-row">
        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="flex justify-center m-8">
            <p className="w-1/2 text-3xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin erat id eros fermentum, vel tincidunt felis vestibulum.</p>
          </div>
          <div>
            <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-2xl m-4">Login</button>
            <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-2xl m-4">Signup</button>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="bottom-image absolute">
            <div className="bg-red-900 h-96 w-60"></div>
          </div>
          <div className="top-image absolute pt-12 pl-10">
            <img src={teamwork} className="teamwork h-96"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
