"use client";

import ReactPlayer from 'react-player/youtube'

const YouTubePlayer = ({ videoId }:any) => {
    return (
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width={"90%"}
        height={"63vh"}
        playbackRate={2}
        controls={true}
        style={{ margin: "auto",borderRadius: "10rem" }}
      />
    );
  };
  
  export default YouTubePlayer;