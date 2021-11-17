import React from "react";




// Create a search function that you can search for a book
function Search({ setSearch, search }) {

// Create a handle search function 
    function handleSearch(e){
        setSearch(e.target.value);
    }

    return (
        <div>
            <input 
                id="search" 
                type="text" 
                value={search}
                placeholder="ENTER BOOK NAME HERE" 
                className="input-holder"
                onChange={handleSearch} 
            />

                
        </div>
    )
}

export default Search;