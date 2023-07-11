import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import sportsConnect from '../../images/sports-connect-logo.png';
import SearchEventsClubs from '../SearchEventsClubs';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
          <button
            onClick={toggleMenu}
            className="block md:hidden text-white hover:text-red-900 focus:text-red-900 focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={menuOpen ? 'hidden' : 'block'}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              ></path>
              <path
                className={menuOpen ? 'block' : 'hidden'}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
              ></path>
            </svg>
          </button>

          <ul
            className={`${menuOpen ? 'block' : 'hidden'
              } md:flex md:flex-row md:items-center md:space-x-4`}
          >
            <li className="text-white p-3">
              <SearchEventsClubs />
            </li>
            <li className="text-white p-3">
              <Link
                to="/profile"
                className="bg-stone-200 hover:bg-red-900 hover:text-white text-black font-bold py-2 px-4 rounded-2xl"
              >
                Profile
              </Link>
            </li>
            <li className="text-white p-3">
              <a
                href="/"
                onClick={() => Auth.logout()}
                className="bg-red-900 hover:bg-rose-900 text-white font-bold py-2 px-4 rounded-2xl"
              >
                Logout
              </a>
            </li>
          </ul>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={toggleMenu}
            className="block md:hidden text-white hover:text-red-900 focus:text-red-900 focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={menuOpen ? 'hidden' : 'block'}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              ></path>
              <path
                className={menuOpen ? 'block' : 'hidden'}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
              ></path>
            </svg>
          </button>

          <ul
            className={`${menuOpen ? 'block' : 'hidden'
              } md:flex md:flex-row md:items-center md:space-x-4`}
          >
            <li className={`m-2 ${menuOpen ? "text-sm" : ""}`}>
              <SearchEventsClubs />
            </li>
            <li className={`text-white p-3 ${menuOpen ? 'text-sm' : ''}`}>
              <Link
                to="/login"
                className={`bg-stone-200 hover:bg-red-900 hover:text-white text-black font-bold py-2 px-4 rounded-2xl ${menuOpen ? 'text-sm' : ''
                  }`}
              >
                Login
              </Link>
            </li>
            <li className={`text-white p-3 ${menuOpen ? 'text-sm' : ''}`}>
              <a
                href="/signup"
                className={`bg-red-900 hover:bg-rose-900 text-white font-bold py-2 px-4 rounded-2xl ${menuOpen ? 'text-sm' : ''
                  }`}
              >
                Signup
              </a>
            </li>
          </ul>
        </>
      );
    }
  }


  if (Auth.loggedIn()) {
    return (
      <header className="flex-row">
        <nav className="bg-black">
          <div className="flex flex-row justify-between p-4">
            <button>
              <Link to={'/profile'}>
                <img className="h-12 mx-2" src={sportsConnect} alt="Logo" />
              </Link>
            </button>
            {showNavigation()}
          </div>
        </nav>
      </header>
    )
  } else {
    return (
      <header className="flex-row">
        <nav className="bg-black">
          <div className="flex flex-row justify-between p-4">
            <button>
              <Link to={'/'}>
                <img className="h-12 mx-2" src={sportsConnect} alt="Logo" />
              </Link>
            </button>
            {showNavigation()}
          </div>
        </nav>
      </header>
    )
  }

}

export default Nav;
