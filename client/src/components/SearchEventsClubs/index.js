import React, { useState } from "react";

import SearchClubs from "../SearchClubs";
import SearchEvents from "../SearchEvents";

const SearchEventsClubs = () => {

    const [searchToggle, setSearchToggle] = useState("");

    const handleToggle = (event) => {
        setSearchToggle(event.target.value)
    }

    return (
        <div>
            <div>
                <button 
                    onClick={handleToggle}
                    name="searchClubs"
                    value="searchClubs"    
                >Search for a club</button>
                {" "}
                <button
                    onClick={handleToggle}
                    name="searchEvents"
                    value="searchEvents"
                >Search for an event</button>
            </div>
            {searchToggle === "searchClubs" && (
                <SearchClubs />
            )}
            {searchToggle === "searchEvents" && (
                <SearchEvents />
            )}
        </div>
    )
}

export default SearchEventsClubs;