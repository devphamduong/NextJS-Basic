import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

async function DetailTrackPage(props: any) {
  const { params } = props;

  const resTrack = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
    method: "GET",
  });

  const resComment = await sendRequest<
    IBackendRes<IModelPaginate<ITrackComment>>
  >({
    url: `http://localhost:8000/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 10,
      trackId: params.slug,
      sort: "-createdAt",
    },
  });

  return (
    <Container>
      <WaveTrack
        track={resTrack?.data ?? null}
        comments={resComment?.data?.result ?? null}
      />
    </Container>
  );
}

export default DetailTrackPage;
