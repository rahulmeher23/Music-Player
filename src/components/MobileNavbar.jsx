import React, { useState } from 'react'
import { Logo, HamburgerIcon } from '../assets/AppIcons'
import SongsList from './SongsList';
import { useSelector } from 'react-redux';

const MobileNavbar = () => {
    const currentSong = useSelector(state => state.songs.currentSong)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className='flex px-5 py-5 justify-between w-full xl:hidden '>
                <Logo />
                <div className="w-8 h-8" onClick={() => setMenuOpen(prev => !prev)}><HamburgerIcon /></div>
            </div>

            <div className="relative z-50">
                <div
                    className={`fixed top-0 left-0 w-full h-full  text-white transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                        } transition-transform duration-300 ease-in-out z-50`}
                    style={{
                        background: `linear-gradient(to left top, #000, ${currentSong ? currentSong.accent : "#331E00"})`,
                    }}
                >
                    <div className="flex justify-start absolute top-0 right-0 p-5">
                        <button onClick={toggleMenu} className="text-3xl">&times;</button>
                    </div>

                    {/* Nav Menus */}
                    {/* <div className="flex flex-col items-center justify-center h-full space-y-8">
                        <div onClick={toggleMenu} className="text-2xl hover:text-gray-400">Home</div>
                        <div onClick={toggleMenu} className="text-2xl hover:text-gray-400">Shop</div>
                        <div onClick={toggleMenu} className="text-2xl hover:text-gray-400">Wishlist</div>
                        <div onClick={toggleMenu} className="text-2xl hover:text-gray-400">Account</div>
                        <div onClick={toggleMenu} className="text-2xl hover:text-gray-400">Cart</div>
                    </div> */}
                    <SongsList />
                </div>
            </div>
        </>
    )
}

export default MobileNavbar