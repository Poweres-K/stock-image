import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
const clientID = `?client_id=${process.env.REACT_APP_API_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleAddmoreImages = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const checkBottom = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !loading
      ) {
        console.log("hit add more");
        handleAddmoreImages();
      }
    };
    console.log("add listener");
    window.addEventListener("scroll", checkBottom);
    return () => {
      console.log("remove listener");
      window.removeEventListener("scroll", checkBottom);
    };
  }, [loading]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.querySelector("input").value);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      let url;
      url =
        search.length === 0
          ? `${mainUrl}${clientID}&page=${page}`
          : `${searchUrl}${clientID}&page=${page}&query=${search}`;

      const response = await fetch(url);
      let data = await response.json();
      console.log(data);
      if (search) {
        data = data.results;
      }
      data = data.map((ele) => {
        const {
          urls: { regular },
          alt_description,
          user: {
            name,
            portfolio_url,
            profile_image: { medium },
          },

          likes,
          id,
        } = ele;
        return {
          regular,
          alt_description,
          name,
          likes,
          id,
          portfolio_url,
          medium,
        };
      });

      setImages((prev) => [...prev, ...data]);
      setLoading(false);
    };

    fetchImage();
  }, [page, search]);

  return (
    <main>
      <section className="search">
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" className="form-input" placeholder="Search" />
          <button className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {images.map((image, index) => {
            return <Photo key={index} imageDetails={image} />;
          })}
        </div>
        {loading && <h2 className="loading">...Loading</h2>}
      </section>
    </main>
  );
}

export default App;
