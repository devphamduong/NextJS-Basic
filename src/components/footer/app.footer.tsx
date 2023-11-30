"use client";
import { AppBar } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Container } from "@mui/material";
import { useHasMounted } from "@/utils/customHook";
import { useTrackContext } from "@/lib/track.wrapper";
import { useRef } from "react";

function AppFooter() {
  const hasMounted = useHasMounted();
  const playRef = useRef(null);
  if (!hasMounted) return <></>;

  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  if (currentTrack.isPlaying) {
    playRef?.current?.audio?.current?.play();
  } else {
    playRef?.current?.audio?.current?.pause();
  }

  return (
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
          onPlay={() => setCurrentTrack({ ...currentTrack, isPlaying: true })}
          onPause={() => setCurrentTrack({ ...currentTrack, isPlaying: false })}
          volume={0.2}
          layout="horizontal-reverse"
        />
        <div>
          <div style={{ color: "#868686" }}>Author</div>
          <div style={{ color: "black" }}>Name</div>
        </div>
      </Container>
    </AppBar>
  );
}

export default AppFooter;
