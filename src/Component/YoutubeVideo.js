import React from "react";
import YouTube from "react-youtube";

export default function YoutubeVideo({ id, opts }) {
  return (
    <div>
      <YouTube videoId={id} opts={opts} />
    </div>
  );
}
