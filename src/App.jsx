import { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSongs } from './store/slice/songsSlice'
import { Logo } from './assets/AppIcons'
import profile_img from "./assets/profile_img.png"

function App() {
  const dispatch = useDispatch()
  const songsList = useSelector(state => state.songs.songsList) 

  console.log("songsList", songsList)

  useEffect(() => {
    document.title = `Music Player`
  }, [])

  useEffect(() => {
    dispatch(fetchSongs())    
  }, [])

  return (
    <>
     <div className='app-wrapper bg-black h-screen w-screen'>
        <div className='sidebar flex flex-col justify-between py-8 pl-8 h-full'>
            <Logo />
            <img src={profile_img} alt="" className='w-12 h-12 object-cover rounded-full'/>
        </div>

        <div className='songs-list'>
          <div className='list-header'>
              <p>For You</p>
              <p>Top Tracks</p>
          </div>
        </div>
     </div>
    </>
  )
}

export default App
