import React, { useEffect, useRef, useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ForwardBtn, PauseBtn, PlayBtn, PreviousBtn, Speaker, ThreeDots } from '../assets/AppIcons';
import { pause, play, forward, previous } from '../store/slice/songsSlice';

const Player = () => {
    const dispatch = useDispatch();
    const currentSong = useSelector(state => state.songs.currentSong);
    const isPlaying = useSelector(state => state.songs.isPlaying);
    const audioRef = useRef(null);

    const imgURL = `https://cms.samespace.com/assets/${currentSong?.cover}`;
    const songURL = currentSong?.url;

    const [seekerValue, setSeekerValue] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            // Handle song loading and play state
            if (songURL) {
                if (isPlaying) {
                    audio.play().catch(error => {
                        console.error("Autoplay failed:", error);
                        dispatch(pause()); // Update state to pause if autoplay fails
                    });
                } else {
                    audio.pause(); // Pause the audio, but do not reset anything
                }
            }

            // Handle time updates to move the seeker forward
            const handleTimeUpdate = () => {
                setSeekerValue((audio.currentTime / audio.duration) * 100);
            };

            const handleLoadedMetadata = () => {
                setSeekerValue(0);
            };

            const handleEnded = () => {
                dispatch(pause());
                setSeekerValue(0);
            };

            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('ended', handleEnded);

            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [currentSong, songURL, isPlaying, dispatch]);

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
            dispatch(pause());
        } else {
            audio.play();
            dispatch(play());
        }
    };

    const handleSeek = (event) => {
        const audio = audioRef.current;
        const rect = event.target.getBoundingClientRect();
        const offsetX = event.clientX - rect.left; // Get X position within the element
        const newTime = (offsetX / rect.width) * audio.duration; // Calculate new time
        audio.currentTime = newTime;
        setSeekerValue((newTime / audio.duration) * 100); // Update the seeker value
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='player-wrapper h-full w-[53vh] flex flex-col justify-center gap-8'>
            <audio ref={audioRef} src={songURL} preload="metadata"></audio>
            
            {/* Song Title */}
            <div className='song-title flex flex-col gap-2'>
                <p className='xl:text-2xl 2xl:text-[32px] font-bold'>{currentSong?.name}</p>
                <p className='text-base text-white opacity-60'>{currentSong?.artist}</p>
            </div>

            {/* Song Cover & Seeker */}
            <div className='flex flex-col gap-6'>
                <img src={imgURL} alt={currentSong?.name} className='w-[53vh] h-[53vh]' />
                
                {/* Custom Seeker */}
                <div className="relative w-full h-2 bg-[rgba(255,255,255,0.2)] rounded-full cursor-pointer" onClick={handleSeek}>
                    <div
                        className="absolute top-0 left-0 h-full bg-white rounded-full"
                        style={{ width: `${seekerValue}%` }}
                    ></div>
                </div>
                {/* <div className="flex justify-between text-sm text-white opacity-60">
                    <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}</span>
                    <span>{audioRef.current ? formatTime(audioRef.current.duration) : '0:00'}</span>
                </div> */}
            </div>

            {/* Controls */}
            <div className='flex items-center justify-between'>
                <div className='w-12 h-12 flex items-center justify-center cursor-pointer rounded-full bg-[rgba(255,255,255,0.1)]'>
                    <ThreeDots />
                </div>

                <div className='flex items-center justify-center gap-8'>
                    <div className='cursor-pointer' onClick={() => dispatch(previous())}><PreviousBtn /></div>
                    <div className='cursor-pointer' onClick={handlePlayPause}>
                        {isPlaying ? <PauseBtn /> : <PlayBtn />}
                    </div>
                    <div className='cursor-pointer' onClick={() => dispatch(forward())}><ForwardBtn /></div>
                </div>

                <div className='w-12 h-12 flex items-center justify-center cursor-pointer rounded-full bg-[rgba(255,255,255,0.1)]'>
                    <Speaker />
                </div>
            </div>
        </div>
    );
};

export default Player;
