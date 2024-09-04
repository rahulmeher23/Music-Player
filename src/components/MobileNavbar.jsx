import React, { useState } from 'react';
import { Logo, HamburgerIcon } from '../assets/AppIcons';
import SongsList from './SongsList';
import { useSelector } from 'react-redux';

const MobileNavbar = () => {
  const currentSong = useSelector(state => state.songs.currentSong);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <>
      <div className="flex px-5 py-5 justify-between w-full xl:hidden">
        <Logo />
        <div className="w-8 h-8" onClick={toggleMenu}><HamburgerIcon /></div>
      </div>

      <div
        className={`fixed inset-y-0 right-0 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 w-screen md:w-[60vw] lg:w-[55vw]`}
        style={{
          background: `linear-gradient(to left top, #000, ${currentSong ? currentSong.accent : "#331E00"})`,
        }}
      >
        <div className="flex justify-end items-center px-5 pt-5">
          {/* <Logo /> */}
          <button onClick={toggleMenu} className="text-3xl text-white">&times;</button>
        </div>

        <div className="overflow-y-auto h-full">
          <SongsList />
        </div>
      </div>

      {/* Overlay to close the menu when clicked */}
      {menuOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleMenu}></div>}
    </>
  );
}

export default MobileNavbar;
