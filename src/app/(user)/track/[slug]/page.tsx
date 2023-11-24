"use client";
import WaveTrack from "@/components/track/wave.track";
import { useSearchParams } from "next/navigation";
import { Container } from "@mui/material";

function DetailTrackPage(props: any) {
  const { params } = props;
  const searchParams = useSearchParams();
  const audio = searchParams.get("audio");

  return (
    <Container>
      <WaveTrack audio={audio} />
    </Container>
  );
}

export default DetailTrackPage;
