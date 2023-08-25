// src/components/RelatedSongs.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import SongBar from './SongBar';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

const RelatedSongs = ({ data, artistId, isPlaying, activeSong }) => {
  const dispatch = useDispatch();

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: song, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // Check if data is an array before mapping
  const songsArray = Array.isArray(data) ? data : [];

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
      <div className="mt-6 w-full flex flex-col">
        {songsArray.map((song, i) => (
          <SongBar
            key={`${artistId}-${song.key}-${i}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
