import React, { useState, useContext } from "react";
import axios from "axios";
import Anime from "./Anime";
import AnimeContext from "../AnimeContext";

const Search:React.FC = (props:Object) => {
  const [title, setTitle] = useState("");
  const [anime, setAnime] = useState([]);
  const context:any = useContext(AnimeContext);

  const searchAnime = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    axios.get(`https://api.jikan.moe/v3/search/anime?q=${title}`)
      .then((res:any):void => {
        console.log(res);
        setTitle("");
        setAnime(res.data.results.slice(0, 5));
      })
      .catch(err => console.log(err));
  }

  const fav = (i:number):void => {
    const temp = [...context.favorites, anime[i]];
    context.setFavorites(temp);
    localStorage.setItem("favorites", JSON.stringify(temp));
  }

  const alreadyFavorited = (mal_id:number):boolean => {
    for(let favorite of context.favorites) {
      if(mal_id === favorite.mal_id) {
        return true;
      }
    }
    return false;
  }

  const remove = (mal_id:number):void => {
    const temp = [];
    for(let favorite of context.favorites) {
      if(mal_id !== favorite.mal_id) {
        temp.push(favorite);
      }
    }
    context.setFavorites(temp);
    localStorage.setItem("favorites", JSON.stringify(temp));
  }

  return (
    <div>
      <div className="flex">
        <div className="left">  
          <h2>Search Component</h2>
          <form onSubmit={searchAnime}>
            <label>Title:</label>
            <br />
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <br />
            <input type="submit" value="Search For Anime" />
          </form>
        </div>
        <div className="right">
          <h2>Search Results</h2>
          {
            anime.map((ani:any, i:number) => 
              <Anime key={i} {...ani}>
                {
                  alreadyFavorited(ani.mal_id) 
                  ? <button onClick={() => remove(ani.mal_id)}>Remove from Favorites</button>
                  : <button onClick={() => fav(i)}>Add To Favorites</button>
                }
              </Anime>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Search;