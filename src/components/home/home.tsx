import "./home.css";
import { useState } from "react";
import ImageContainer from "../imageContainer/imageContainer";
import SearchContainer from "../searchContainer/searchContainer";
import LastSearchesContainer from "../lastSearchesContainer/lastSearchesContainer";

const MIX_CLOUD_API_URL = "https://api.mixcloud.com/";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<any>();
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");

  // Save search terms to localStorage before the window unloads
  window.addEventListener("beforeunload",() =>{
    localStorage.setItem("searchTerms", JSON.stringify(searchTerms));
  })

  // Load search terms from localStorage on component mount
  useState(() => {
    const storedSearchTerms = localStorage.getItem("searchTerms");
    if (storedSearchTerms) {
      setSearchTerms(JSON.parse(storedSearchTerms));
    }
  });

  const fetchData = async (query: string, url?: string) => {
    try {
      const response = await fetch(
        url
          ? url
          : `${MIX_CLOUD_API_URL}search/?q=${query}&type=cloudcast&limit=6`
      );
      const results = await response.json();
      if (url) onSearch(query);

      if (results) {
        setData(results.data);
        setNextUrl(results.paging.next);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSearch = (term: string, shouldUpdateHistory: boolean = true) => {
    fetchData(term);
    if (shouldUpdateHistory) {
      setSearchTerms((prevTerms) => {
        const updatedTerms = [term.toLocaleLowerCase(), ...prevTerms];
        return updatedTerms.slice(0, 5);
      });
    }
  };

  return (
    <div>
      <h1>Mix App</h1>
      <div className="content-container">
        <SearchContainer
          className="content-conatiner-item"
          setSelectedItem={setSelectedItem}
          onSearch={(v) => onSearch(v)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          data={data}
          nextUrl={nextUrl}
        />
        <ImageContainer
          item={selectedItem}
          className="content-conatiner-item"
        />
        <LastSearchesContainer
          className="content-conatiner-item"
          searches={searchTerms}
          onSearchClick={(v) => {
            setSearchTerm(v);
            onSearch(v, false);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
