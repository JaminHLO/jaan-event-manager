import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";


function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className="flex flex-row justify-between p-4 bg-slate-950">
          <h1 className="text-2xl text-white p-3">Sports Connect</h1>
          <ul className=" flex flex-row">
            <li className="text-white p-3">
              <button className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-2xl">
              <Link
                to={`/searchEventsClubs`}
              >Search</Link>
              </button>
            </li>
            <li className="text-white p-3">
              <button className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-2xl">
                <a href="/profile">
                Profile
                </a>
              </button>
            </li>
            <li className="text-white p-3">
              {/* this is not using the Link component to logout or user and then refresh the application to the start */}
              <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-2xl">
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
          <h1 className="text-2xl text-white">Sports Connect</h1>
          <ul className="flex flex-row">
            <li className="mx-1">
              <button className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-2xl">
                <Link to="/searchEventsClubs">
                  Search
                </Link>
              </button>
            </li>
            <li className="mx-1">
              <button className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-2xl">
                <Link to="/login">
                  Login
                </Link>
              </button>
            </li>
            <li className="mx-1">
              <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-2xl">
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
