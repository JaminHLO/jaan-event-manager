import React from "react";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";
import teamwork from "../images/teamwork.png";
import sportsTeam from "../images/sports-team.png";
// import EventMap from "../components/EventMap";
import { Link } from "react-router-dom";
import logo from "../images/sports-connect-logo.png";

const Home = () => {
  return (
    <div className="home">
      <div className="hero flex lg:items-center xs:justify-center lg:justify-start lg:pl-40 w-screen">
        <div className="bg-transparent opacity-70 h-80 w-80 flex justify-center items-center">
          <div className="flex flex-col text-center text-white">
            {/* <h1 className="text-2xl font-bold">Sports Connect</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            <img className="h-50" src={logo}></img>
          </div>
        </div>
      </div>
      <div className="mid-page lg:min-h-[60vh] xs:h-auto bg-black flex md:flex-row xs:flex-col">
        <div className="lg:w-1/2 xs:w-auto max-w-5xl flex flex-col items-center justify-center">
          <div className="flex justify-center m-8">
            <p className="lg:w-1/2 text-3xl text-white xs:text-center lg:text-left">Sport Connect is a dynamic online platform designed to unite sports lovers by offering them a convenient and user-friendly space to create and organize clubs and events centered around their favorite sports activities.</p>
          </div>
          <div>
            <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-2xl m-4"><Link to={'/login'}>Login</Link></button>
            <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-2xl m-4"><Link to={'/signup'}>Signup</Link></button>
          </div>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center">
          <div className="bottom-image xs:hidden lg:absolute lg:block">
            <div className="bg-red-900 h-96 w-60"></div>
          </div>
          <div className="top-image lg:absolute h-auto lg:z-[1] lg:min-w-[43.75rem] lg:max-w-[50rem] lg:mt-[5em] lg:ml-[5em] xs:min-w-[45rem] xs:m-10">
            <img src={teamwork} alt="teamwork" className="teamwork h-96"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
