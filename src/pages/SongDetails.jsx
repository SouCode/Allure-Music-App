// src/pages/SongDetails.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';
import DetailsHeader from '../components/DetailsHeader';
import Loader from '../components/Loader';
import Error from '../components/Error';

const SongDetails = () => {
  const { songid } = useParams();
  const { data: songData, isLoading, isError } = useGetSongDetailsQuery({ songid });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !songData) {
    return <Error message="Failed to fetch song details." />;
  }

  const lyricsSection = songData.sections?.find((section) => section.type === 'LYRICS');

  return (
    <div className="flex flex-col">
      <DetailsHeader songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {lyricsSection ? (
            lyricsSection.text.map((line, i) => (
              <p className="text-gray-400 text-base my-1" key={i}>{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
