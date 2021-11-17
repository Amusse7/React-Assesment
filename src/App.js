import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";
import axios from "axios";

function App() {
    const [data, setData] = useState(""); // useState has ("") and empty string as its inital value
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // useEffect to fetch the data
    useEffect(() => {
        setLoading(true);

        (async function () {
            let dataArr = (
                await axios.get(
                    "http://openlibrary.org/search.json?author=tolkien"
                )
            ).data.docs;

            setData(dataArr);
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <pre>{JSON.stringify(error, null, 2)}</pre>;
    }

    if (!data) {
        return null;
    }

	const checkImg=(e)=>{
		let img=new Image();
		img.onload=function() {
			if(this.width<10 || this.height<10) {
				e.target.src="https://via.placeholder.com/270x200?text=No Cover";
			}
		}

		img.src=e.target.src;
	};

	const sortByTitle=()=>{
		let newArr=[...data];
		newArr.sort((a,b)=>a.title.toString().localeCompare(b.title));
        setData(newArr);
	};
	
	const sortByDate=()=>{
		let newArr=[...data];
		newArr.sort((a,b)=>b.first_publish_year-a.first_publish_year);
		setData(newArr);
	};

    return (
        <div className="container">
            <Search />
            <div className="filters">
                <button className="btn" onClick={sortByTitle}>Sort by Title</button>
                <button className="btn" onClick={sortByDate}>Sort by Most Recent</button>
            </div>

			<div className="data-container">
				{data.map((item, i) => {
                    return (
                        <div key={i} className="book">
                            <i className="fa fa-book"></i>
                            <div className="book-cover">
							<img
                                src={`https://covers.openlibrary.org/b/isbn/${
                                    Array.isArray(item.isbn)
                                        ? item.isbn[0]
                                        : item.isbn
                                }-M.jpg`}
							alt={`Cover image for the book: ${item.title}`}
                            onLoad={checkImg} />
							</div>
                            <div className="book-info">
								<h3 className="book-title">{item.title}</h3>
								<p className="book-author">{item.author_name}</p>
								<p className="book-publish">{Array.isArray(item.publish_date)
									? item.publish_date[0]
									: item.publish_date}</p>
							</div>
                        </div>
                    );
                })}
			</div>
        </div>
    );
}

export default App;
