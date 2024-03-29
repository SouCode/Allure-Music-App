// src/components/SongBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongBar = ({ song, i, artistId, isPlaying, activeSong }) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data: song, i }));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // Extract song details based on the data structure
  const songDetails = song.attributes || song;

  return (
    <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.title === songDetails?.title ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={artistId ? songDetails?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : songDetails?.images?.coverart}
          alt={songDetails?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${songDetails.key || songDetails.id}`}>
            <p className="text-xl font-bold text-white">
              {songDetails?.title}
            </p>
          </Link>
          <p className="text-base text-gray-300 mt-1">
            {artistId ? songDetails?.albumName : songDetails?.subtitle}
          </p>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying && activeSong === song}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

export default SongBar;
