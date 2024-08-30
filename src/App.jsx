import { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSongs } from './store/slice/songsSlice'
import { Logo, SearchIcon } from './assets/AppIcons'
import profile_img from "./assets/profile_img.png"
import SongCard from './components/SongCard'

function App() {
  const dispatch = useDispatch()
  const songsList = useSelector(state => state.songs.songsList) 
  const loading = useSelector(state => state.songs.loading) 

  console.log("songsList", songsList)

  useEffect(() => {
    document.title = `Music Player`
  }, [])

  useEffect(() => {
    dispatch(fetchSongs())    
  }, [])

  return (
    <>
     <div className='app-wrapper bg-black h-screen w-screen flex'>
        <div className='sidebar flex flex-col justify-between py-8 pl-8 h-full'>
            <Logo />
            <img src={profile_img} alt="" className='w-12 h-12 object-cover rounded-full'/>
        </div>

        <div className='songs-list'>
          {/* Header Options */}
          <div className='list-header flex gap-10 p-4 text-2xl font-bold '>
              <p>For You</p>
              <p>Top Tracks</p>
          </div>

          {/* Search Bar */}
          <div className='relative search-bar w-full  h-12'>
            <input type="text" placeholder='Search Songs, Artist' className='w-full h-full px-4 py-2 rounded-lg ' /> 
            <div className='absolute right-5 top-3 opacity-10'>
              <SearchIcon />
            </div>
          </div>

          {/* SongsList */}
          <div className='songs-list'>
          {
            loading ? ( <div className='h-full w-full m-auto text-3xl'>Loading</div>) : (
              songsList.map((song) => {
                return (
                  <SongCard song={song} />
                )
              })
            )
          }
          </div>
        </div>
     </div>
    </>
  )
}

export default App
