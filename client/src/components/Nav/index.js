import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import sportsConnect from "../../images/sports-connect-logo.png";
import SearchEventsClubs from "../SearchEventsClubs";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className="flex flex-row justify-between p-4 bg-slate-950">
          <button><Link to={'/profile'}><img className="m-2 h-12" src={sportsConnect}></img></Link></button>
          <ul className=" flex flex-row">
            <li className="text-white p-3">
              <SearchEventsClubs />
            </li>
            <li className="text-white p-3">
              <button className="bg-stone-200 hover:bg-red-900 hover:text-white text-black font-bold py-2 px-4 rounded-2xl">
                <a href="/profile">
                  Profile
                </a>
              </button>
            </li>
            <li className="text-white p-3">
              {/* this is not using the Link component to logout or user and then refresh the application to the start */}
              <button className="bg-red-900 hover:bg-rose-900 text-white font-bold py-2 px-4 rounded-2xl">
                <a href="/" onClick={() => Auth.logout()}>
                  Logout
                </a>
              </button>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row justify-between p-4 bg-slate-950">
          <button><Link to={`/`}><img className="h-12 mx-2" src={sportsConnect}></img></Link></button>
          <ul className="flex flex-row">
            <li className="m-2">
              <SearchEventsClubs />
            </li>
            <li className="m-2">
              <button className="bg-stone-200 hover:bg-red-900 hover:text-white text-black font-bold py-2 px-4 rounded-2xl">
                <Link to="/login">
                  Login
                </Link>
              </button>
            </li>
            <li className="m-2">
              <button className="bg-red-900 hover:bg-rose-900 text-white font-bold py-2 px-4 rounded-2xl">
                <Link to="/signup">
                  Signup
                </Link>
              </button>
            </li>
          </ul>
        </div>
      );
    }
  }

  return (
    <header className="flex-row">
      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
