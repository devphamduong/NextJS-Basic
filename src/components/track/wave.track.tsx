"use client";
import { useWavesurfer } from "@/utils/customHook";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

function WaveTrack(props: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { audio } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const optionsMemo = useMemo(() => {
    return {
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: `/api?audio=${audio}`,
    };
  }, []);
  const wavesurfer = useWavesurfer(containerRef, optionsMemo);

  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  useEffect(() => {
    if (!wavesurfer) return;

    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime: number) =>
        setCurrentTime(currentTime)
      ),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <>
      <div ref={containerRef} style={{ minHeight: "120px" }} />

      <button onClick={onPlayClick} style={{ marginTop: "1em" }}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <p>Seconds played: {currentTime}</p>
    </>
  );
}

export default WaveTrack;
