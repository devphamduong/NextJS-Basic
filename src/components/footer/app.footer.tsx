"use client";
import { AppBar, Toolbar } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Container } from "@mui/material";
import { useHasMounted } from "@/utils/customHook";

function AppFooter() {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0, backgroundColor: "#f2f2f2" }}
    >
      <Container sx={{ display: "flex", gap: 10, alignItems: "center" }}>
        <AudioPlayer
          style={{ boxShadow: "none", backgroundColor: "transparent" }}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
          onPlay={(e) => console.log("onPlay")}
          volume={0.2}
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
