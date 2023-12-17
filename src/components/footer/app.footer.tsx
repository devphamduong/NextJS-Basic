"use client";
import { AppBar } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Container } from "@mui/material";
import { useHasMounted } from "@/utils/customHook";
import { useTrackContext } from "@/lib/track.wrapper";
import { useEffect, useRef } from "react";

function AppFooter() {
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  const hasMounted = useHasMounted();
  const playRef = useRef(null);

  useEffect(() => {
    if (currentTrack?.isPlaying === true) {
      //@ts-ignore
      playRef?.current?.audio?.current?.play();
    } else if (currentTrack?.isPlaying === false) {
      //@ts-ignore
      playRef?.current?.audio?.current?.pause();
    }
  }, [currentTrack]);

  if (!hasMounted) return <></>;

  return (
    <>
      {currentTrack._id && (
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0, backgroundColor: "#f2f2f2" }}
        >
          <Container
            sx={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              ".rhap_main": {
                gap: "30px",
              },
            }}
          >
            <AudioPlayer
              ref={playRef}
              autoPlay={false}
              style={{ boxShadow: "none", backgroundColor: "transparent" }}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
              onPlay={() =>
                setCurrentTrack({ ...currentTrack, isPlaying: true })
              }
              onPause={() =>
                setCurrentTrack({ ...currentTrack, isPlaying: false })
              }
              volume={0.2}
              layout="horizontal-reverse"
            />
            <div>
              <div style={{ color: "#868686" }}>{currentTrack.description}</div>
              <div style={{ color: "black" }}>{currentTrack.title}</div>
            </div>
          </Container>
        </AppBar>
      )}
    </>
  );
}

export default AppFooter;
