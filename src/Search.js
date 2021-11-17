import React from "react";


// Create a handle search function 
    function Search(e){
        e.preventDefault();

    return (
        <div>
            <input id="search" type="text" placeholder="ENTER BOOK NAME HERE" className="input-holder"onChange={Search}></input>
        </div>
    )
}

export default Search;