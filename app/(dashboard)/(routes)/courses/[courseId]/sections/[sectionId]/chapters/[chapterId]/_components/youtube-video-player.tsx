"use client";

import ReactPlayer from 'react-player/youtube'

const YouTubePlayer = ({ videoId }:any) => {
    return (
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width={"100%"}
        height={'calc(100vh - 85px)'}
        playbackRate={2}
        controls={true}
        playing={true}
        style={{ marginRight: "auto" }}
      />
    );
  };
  
  export default YouTubePlayer;