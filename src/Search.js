import React from "react";


// Create a search function that you can search for a book
function Search() {

// Create a handle search function 
    function handleSearch(e){
        e.preventDefault();

    }

    return (
        <div>
            <input id="search" type="text" placeholder="ENTER BOOK NAME HERE" className="input-holder"onChange={handleSearch}></input>
        </div>
    )
}

export default Search;