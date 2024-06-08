"use client";

import ReactPlayer from 'react-player/youtube'

const YouTubePlayer = ({ videoId }:any) => {
    return (
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width={"95%"}
        height={'calc(95vh - 104px)'}
        playbackRate={2}
        controls={true}
        playing={true}
        style={{ }}
      />
    );
  };
  
  export default YouTubePlayer;