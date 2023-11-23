"use client";
import WaveSurfer from "wavesurfer.js";
import { useEffect } from "react";

function WaveTrack() {
  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: document.getElementById("wave")!,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: "/audio/DieForYou.mp3",
    });
    wavesurfer.on("click", () => {
      wavesurfer.play();
    });
  }, []);

  return <div className="" id="wave"></div>;
}

export default WaveTrack;
