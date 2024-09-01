import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong } from '../store/slice/songsSlice';

const SongCard = ({ song }) => {
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.songs.currentSong)
  const { id, name, artist, cover, accent, url } = song
  console.log("currentSong", currentSong)
  const imgURL = `https://cms.samespace.com/assets/${cover}`;

  const handleClick = () => {
    dispatch(setCurrentSong(song))
  }

  return (
    <>
      {/* <div className={`song-card-wrapper w-full p-4 flex justify-between items-center ${` bg-[rgba(255,255,255,0.08)]`}`} onClick={handleClick}> */}
      <div className={`song-card-wrapper w-full p-4 flex justify-between items-center cursor-pointer ${currentSong && currentSong.id === song.id ? 'bg-[rgba(255,255,255,0.08)] rounded-lg' : ''
        }`} onClick={handleClick}>
        <div className='cover-details flex gap-4'>
          <img src={imgURL} alt="" className='cover-img h-12 w-12 rounded-full object-cover' />
          <div>
            <p className='text-lg leading-[24px]'>{name}</p>
            <p className='text-sm leading-[24px] opacity-60'>{artist}</p>
          </div>
        </div>

        <div className='cover-duration'>
          <p>4:00</p>
        </div>

      </div>
    </>
  )
}

export default SongCard