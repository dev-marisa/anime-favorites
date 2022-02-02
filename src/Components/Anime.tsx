import React from "react";

type AnAnime = {
  episodes: number;
  image_url: string;
  mal_id: number;
  score: number;
  synopsis: string;
  title: string;
  type: string;
  url: string;
  children: React.FC;
}

const Anime:React.FC<AnAnime> = (props:AnAnime) => {
   
  return (
    <div className="anime">
      <div className="left">
        <img src={props.image_url} alt="anime poster" className="img-sm" />
      </div>
      <div className="right">
        <a href={props.url} target="_blank" rel="noreferrer">
          <h3>{props.title}</h3>
        </a>
        <p>{props.synopsis}</p>
        <p>Score: {props.score}</p>
        <p>Anime Type: {props.type}</p>
        <p>Episodes: {props.episodes}</p>
        {
          props.children
        }
      </div>
    </div>
  );
}

export default Anime;