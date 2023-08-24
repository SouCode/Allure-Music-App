import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import DetailsHeader from "../components/DetailsHeader";
import Loader from "../components/Loader";
import Error from "../components/Error";
import RelatedSongs from "../components/RelatedSongs";

const SongDetails = () => {
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isLoading,
    isError,
  } = useGetSongDetailsQuery({ songid });
  const { data: relatedSongs, isLoading: isLoadingRelatedSongs } =
    useGetSongRelatedQuery({ songid });

  if (isLoading || isLoadingRelatedSongs) {
    return <Loader />;
  }

  if (isError || !songData) {
    return <Error message="Failed to fetch song details." />;
  }

  const lyricsSection = songData.sections?.find(
    (section) => section.type === "LYRICS"
  );

  const handlePauseClick = () => {
    // Define your pause logic here
  };

  const handlePlayClick = (song, i) => {
    // Define your play logic here
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {lyricsSection ? (
            lyricsSection.text.map((line, i) => (
              <p className="text-gray-400 text-base my-1" key={i}>
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, No lyrics found!
            </p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={relatedSongs}
        artistId={null} 
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
