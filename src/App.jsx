import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from './store/slice/songsSlice';
import { Logo } from './assets/AppIcons';
import profile_img from "./assets/profile_img.png";
import Player from './components/Player';
import SongsList from './components/SongsList';
import MobileNavbar from './components/MobileNavbar';
import './App.css';  // Import the custom CSS

function App() {
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.songs.currentSong);

  useEffect(() => {
    document.title = `Music Player`;
  }, []);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);



  return (
    <>
      <div className="app-wrapper h-screen flex flex-col xl:flex-row" style={{
          background: `linear-gradient(to left top, #000, ${currentSong && currentSong.accent })`,
        }}>
        <div className='flex w-full xl:w-[47vw] justify-between'>
          <div className='sidebar hidden xl:flex flex-col justify-between py-8 pl-8 h-full'>
            <Logo />
            <img src={profile_img} alt="Profile" className='w-12 h-12 object-cover rounded-full' />
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
  );
}

export default App;
