import React, {useContext} from "react";
import AnimeContext from "../AnimeContext";
import Anime from "./Anime";

const Favorites:React.FC = (props:Object) => {

  const context:any = useContext(AnimeContext);

  const remove = (i:number):void => {
    var temp = context.favorites.slice(0, i)
      .concat(context.favorites.slice(i+1))
    context.setFavorites(temp);
    localStorage.setItem("favorites", JSON.stringify(temp));
  }
  
  return (
    <div>
      <h2>My Favorites</h2>
          {
            context.favorites.length === 0 
            ? <p>You have no favorites yet</p>
            : context.favorites.map((ani:any, i:number) => 
              <Anime key={i} {...ani}>
                <button onClick={() => remove(i)}>
                  Remove from favorites
                </button>
              </Anime>
            )
          }
    </div>
  );
}

export default Favorites;