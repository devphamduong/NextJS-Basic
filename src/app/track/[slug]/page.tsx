"use client";
import WaveTrack from "@/components/track/wave.track";
import { useSearchParams } from "next/navigation";

function DetailTrackPage(props: any) {
  const { params } = props;
  const searchParams = useSearchParams();
  const audio = searchParams.get("audio");

  return (
    <>
      <WaveTrack audio={audio} />
    </>
  );
}

export default DetailTrackPage;
