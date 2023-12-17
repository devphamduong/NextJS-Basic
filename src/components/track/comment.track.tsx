"use client";
import { fetchDefaultImage } from "@/utils/api";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
dayjs.extend(relativeTime);

interface IProps {
  track: ITrackTop | null;
  comments: ITrackComment[] | null;
}

function CommentTrack(props: IProps) {
  const { track, comments } = props;
  const [comment, setComment] = useState<string>("");

  const handleAddComment = () => {};

  return (
    <>
      <div>
        <TextField
          label="Comment"
          variant="standard"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddComment();
            }
          }}
        />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid
            xs={2}
            sx={{
              textAlign: "center",
            }}
          >
            <img
              src={fetchDefaultImage(track!.uploader!.type)}
              width={150}
              height={150}
            />
            <span>{track?.uploader.email}</span>
          </Grid>
          <Grid xs={10}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {comments?.map((item, index) => {
                return (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <img
                      src={fetchDefaultImage(item.user.type)}
                      width={40}
                      height={40}
                    />
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          {item.user.email} at {item.moment}
                        </span>
                        <span style={{ color: "#999" }}>
                          {dayjs(item.createdAt).fromNow()}
                        </span>
                      </div>
                      aaaaaaaaaa
                    </div>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default CommentTrack;
