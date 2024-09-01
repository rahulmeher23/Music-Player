import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSongs } from './store/slice/songsSlice'
import { Logo, SearchIcon } from './assets/AppIcons'
import profile_img from "./assets/profile_img.png"
import SongCard from './components/SongCard'
import Player from './components/Player'
import SongsList from './components/SongsList'
import MobileNavbar from './components/MobileNavbar'

function App() {
  const dispatch = useDispatch()
  const songs = useSelector(state => state.songs.songs)
  // const loading = useSelector(state => state.songs.loading)
  const currentSong = useSelector(state => state.songs.currentSong)
  // const accent = '#FF5400'
  console.log("songsList", songs)

  useEffect(() => {
    document.title = `Music Player`
  }, [])

  useEffect(() => {
    dispatch(fetchSongs())
  }, [])

  return (
    <>
      <div className='app-wrapper h-screen flex flex-col xl:flex-row ' style={{
        background: `linear-gradient(to left top, #000, ${currentSong ? currentSong.accent : "#331E00"})`,
      }}>

        <div className='flex w-full xl:w-[47vw] justify-between'>
          <div className='sidebar hidden xl:flex flex-col justify-between py-8 pl-8 h-full'>
            <Logo />
            <img src={profile_img} alt="" className='w-12 h-12 object-cover rounded-full' />
          </div>
          <MobileNavbar />
          <div className='hidden xl:block'>
            <SongsList />
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Player />
        </div>
      </div>
    </>
  )
}

export default App
