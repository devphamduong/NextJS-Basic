import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

async function DetailTrackPage(props: any) {
  const { params } = props;

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
    method: "GET",
  });

  return (
    <Container>
      <WaveTrack track={res?.data ?? null} />
    </Container>
  );
}

export default DetailTrackPage;
