import React, {useState, useEffect} from "react";
import { Link, Routes, Route } from "react-router-dom";
import Search from "./Components/Search";
import Favorites from "./Components/Favorites";
import AnimeContext from './AnimeContext';

const App:React.FC = () => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if(storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch(err) {
        console.log("history corrupted... \n", err);
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  return (
    <div>
      <AnimeContext.Provider value={{favorites, setFavorites}}>
        <h1>Anime Favorites</h1>
        <Link to="/anime-favorites/search">Search</Link>
        {" | "}
        <Link to="/anime-favorites">Your Favorites ({favorites.length})</Link>
        <Routes>
          <Route path="/anime-favorites/search" element={ <Search/> } />
          <Route path="/anime-favorites" element={ <Favorites/> } />
        </Routes>
      </AnimeContext.Provider>
    </div>
  );
}

export default App;
