import React from "react";
import videojs from "video.js";
import "videojs-overlay";
import "video.js/dist/video-js.css";

// https://videojs.com/guides/options/
const DEFAULT_OPTIONS = {
  autoplay: false,
  controls: true,
  responsive: true,
  preload: true,
  fluid: true,
  playbackRates: [1, 1.25, 1.5, 1.75, 2],
};

const DEFAULT_TRACK_OPTION = {
  kind: "captions",
  srclang: "en",
  label: "English",
  default: true,
};

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  // Somehow if we put `overlay` in `options`, videojs will not initiate properly
  const { onEnded } = props;
  const { overlay, ...rest } = props.options;
  const options = { ...DEFAULT_OPTIONS, ...rest };

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        if (options.track) {
          player.addRemoteTextTrack({
            ...DEFAULT_TRACK_OPTION,
            ...options.track,
          });
        }

        if (overlay) {
          player.overlay(overlay);
        }

        // https://www.w3schools.com/tags/ref_av_dom.asp
        player.on("ended", () => onEnded && onEnded());
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, overlay, onEnded]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
