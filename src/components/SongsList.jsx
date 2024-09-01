import React, { useState } from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";
// import { fetchSongs, forYou, topTracks } from './store/slice/songsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { forYou, topTracks } from '../store/slice/songsSlice';
import { SearchIcon } from '../assets/AppIcons';
import SongCard from './SongCard';

const SongsList = () => {
    const dispatch = useDispatch()
    const [tab, setTab] = useState(true); //True meaning "For You", false meaning "Favourites"
    const songs = useSelector(state => state.songs.songs)
    const loading = useSelector(state => state.songs.loading)
    return (
        <>
            {/* <div className='songs-list mt-10 h-[calc(100vh-40px)] max-h-[calc(100vh-40px)] overflow-y-scroll'> */}
            <div className='songs-list mt-10 xl:w-[350px]  2xl:w-[432px]'>
                {/* Header Options */}
                <div className='list-header flex gap-10 px-4 text-2xl font-bold mb-8'>
                    <p className={`${tab ? 'text-white' : "text-white opacity-50"} cursor-pointer`} onClick={() => { setTab(true); dispatch(forYou()) }}>For You</p>
                    <p className={`${!tab ? 'text-white' : "text-white opacity-50"} cursor-pointer`} onClick={() => { setTab(false); dispatch(topTracks()) }}>Top Tracks</p>
                </div>

                {/* Search Bar */}
                <div className='relative search-bar w-full h-12 mb-6'>
                    <input type="text" placeholder='Search Songs, Artist' className='w-full h-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.08)] focus:none' />
                    <div className='absolute right-5 top-3 opacity-10'>
                        <SearchIcon color='rgba(255, 255, 255, 0.08)' />
                    </div>
                </div>

                {/* SongsList */}
                <div className='songs-list flex-1 overflow-y-scroll h-[calc(100vh-40px-136px)] '>
                    {
                        loading ? (<div className='h-full  text-3xl'>
                            <ScaleLoader
                                color='#FFF'
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"

                                className='h-full  w-full text-center'
                            />
                        </div>) : (
                            songs.map((song) => {
                                return (
                                    <SongCard key={song.id} song={song} />
                                )
                            })
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default SongsList