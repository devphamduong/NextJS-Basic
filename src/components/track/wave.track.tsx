"use client";
import WaveSurfer from "wavesurfer.js";
import { useEffect, useRef } from "react";

function WaveTrack(props: any) {
  const ref = useRef<HTMLDivElement>(null);
  const { audio } = props;

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: ref.current!,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: `/api?audio=${audio}`,
    });
    wavesurfer.on("click", () => {
      wavesurfer.play();
    });
  }, []);

  return <div ref={ref}></div>;
}

export default WaveTrack;
