import React from 'react'
import { useSelector } from 'react-redux'
import { ForwardBtn, PlayBtn, PreviousBtn, Speaker, ThreeDots } from '../assets/AppIcons';

const Player = () => {
    const currentSong = useSelector(state => state.songs.currentSong);
    const imgURL = `https://cms.samespace.com/assets/${currentSong?.cover}`
    return (
        <div className='player-wrapper h-full w-[53vh] flex flex-col justify-center gap-8'>
            {/* Song Title */}
            <div className='song-title flex flex-col gap-2'>
                <p className='xl:text-2xl 2xl:text-[32px] font-bold'>{currentSong?.name}</p>
                <p className='text-base text-white opacity-60'>{currentSong?.artist}</p>
            </div>

            {/* Song Cover & Seeker */}
            <div className='flex flex-col gap-6'>
                <img src={imgURL} alt={currentSong?.name} className='w-[53vh] h-[53vh]' />
                <div className='h-[6px] text-white bg-white opactiy-50 rounded-2xl'></div>
            </div>

            <div className='flex items-center justify-between'>
                <div className='w-12 h-12 flex items-center justify-center cursor-pointer rounded-full bg-[rgba(255,255,255,0.1)]'>
                    <ThreeDots />
                </div>

                <div className='flex items-center justify-center gap-8'>
                    <div className='cursor-pointer'><PreviousBtn /></div>
                    <div className='cursor-pointer'><PlayBtn /></div>
                    <div className='cursor-pointer'><ForwardBtn /></div>
                </div>

                <div className='w-12 h-12 flex items-center justify-center cursor-pointer rounded-full bg-[rgba(255,255,255,0.1)]'>
                    <Speaker />
                </div>
            </div>



        </div>
    )
}

export default Player