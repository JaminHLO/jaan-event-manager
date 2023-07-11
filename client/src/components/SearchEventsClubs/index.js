import React, { useState } from "react";

import SearchClubs from "../SearchClubs";
import SearchEvents from "../SearchEvents";
import { Link } from "react-router-dom";

const SearchEventsClubs = () => {

    const [display, setDisplay] = useState("none");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleDisplay = () => {
        if (!menuOpen) {
            setDisplay("block");
            setMenuOpen(true);
        } else {
            setDisplay("none");
            setMenuOpen(false);
        }
    }

    return (
        <div>
            <button
                className={`bg-stone-200 hover:bg-red-900 hover:text-white text-black font-bold py-2 px-4 rounded-2xl ${menuOpen ? "text-sm" : ""
                    }`}
                onClick={handleDisplay}
            >
                Search ▾
            </button>
            <div style={{ display: display }}>
                <div>
                    <button
                        className={`bg-transparent hover:text-red-900 text-white font-bold py-2 px-4 rounded-2xl ${menuOpen ? "text-sm" : ""
                            }`}
                        onClick={handleDisplay}
                    >
                        <Link to="/searchClubs">▸ For Clubs</Link>
                    </button>
                </div>
                <div>
                    <button
                        className={`bg-transparent hover:text-red-900 text-white font-bold py-2 px-4 rounded-2xl ${menuOpen ? "text-sm" : ""
                            }`}
                        onClick={handleDisplay}
                    >
                        <Link to="searchEvents">▸ For Events</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchEventsClubs;