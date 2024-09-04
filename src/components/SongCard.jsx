import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../store/slice/songsSlice";

const SongCard = ({ song }) => {
  const dispatch = useDispatch();
    const [duration, setDuration] = useState() 
  const currentSong = useSelector((state) => state.songs.currentSong);
  const { id, name, artist, cover, accent, url } = song;
  console.log("currentSong", currentSong);
  const imgURL = `https://cms.samespace.com/assets/${cover}`;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleClick = () => {
    dispatch(setCurrentSong(song));
  };

  useEffect(() => {
    const audio = new Audio(url);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })
    
    return () => {
    audio.removeEventListener("loadedmetadata", () => {});
  };
  }, [url])

  

  return (
    <>
      {/* <div className={`song-card-wrapper w-full p-4 flex justify-between items-center ${` bg-[rgba(255,255,255,0.08)]`}`} onClick={handleClick}> */}
      <div
        className={`song-card-wrapper w-full p-4 flex justify-between items-center cursor-pointer ${
          currentSong && currentSong.id === song.id
            ? "bg-[rgba(255,255,255,0.08)] rounded-lg"
            : ""
        }`}
        onClick={handleClick}
      >
        <div className="cover-details flex gap-4">
          <img
            src={imgURL}
            alt=""
            className="cover-img h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="text-lg leading-[24px]">{name}</p>
            <p className="text-sm leading-[24px] opacity-60">{artist}</p>
          </div>
        </div>

        <div className="cover-duration">
          <p>{formatTime(duration)}</p>
        </div>
      </div>
    </>
  );
};

export default SongCard;
