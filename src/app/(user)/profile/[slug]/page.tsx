import { sendRequest } from "@/utils/api";
import * as React from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileTrack from "@/components/profile/profile.track";

async function ProfilePage({ params }: { params: { slug: string } }) {
  const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: `http://localhost:8000/api/v1/tracks/users?current=3&pageSize=10`,
    method: "POST",
    body: {
      id: params.slug,
    },
  });

  const data = tracks?.data?.result ?? [];

  return (
    <Container>
      <Grid container spacing={5}>
        {data?.map((item: ITrackTop, index: number) => {
          return (
            <Grid xs={12} md={6} key={item._id}>
              <ProfileTrack data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default ProfilePage;
