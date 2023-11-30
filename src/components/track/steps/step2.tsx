"use client";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useSession } from "next-auth/react";
import axios from "axios";
import { sendRequest } from "@/utils/api";
import { useToast } from "@/utils/toast";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function LinearWithValueLabel(props: IProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <span>You're uploading track: {props.trackUpload.fileName}</span>
      <LinearProgressWithLabel value={props.trackUpload.progress} />
    </Box>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload(props: any) {
  const toast = useToast();
  const { info, setInfo } = props;
  const { data: session } = useSession();

  const handleUpload = async (image: any) => {
    const formData = new FormData();
    formData.append("fileUpload", image);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/files/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            target_type: "images",
          },
        }
      );
      setInfo({
        ...info,
        imageUrl: res.data.data.fileName,
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      onChange={(e) => {
        const event = e.target as HTMLInputElement;
        if (event.files) {
          handleUpload(event.files[0]);
        }
      }}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}

interface IProps {
  setValue: (v: number) => void;
  trackUpload: {
    fileName: string;
    progress: number;
    fileUrl: string;
  };
}

interface ITrack {
  title: string;
  description: string;
  trackUrl: string;
  imageUrl: string;
  category: string;
}

function Step2(props: IProps) {
  const toast = useToast();
  const { data: session } = useSession();
  const [info, setInfo] = useState<ITrack>({
    title: "",
    description: "",
    trackUrl: "",
    imageUrl: "",
    category: "",
  });

  const { trackUpload, setValue } = props;

  const categories = [
    {
      value: "CHILL",
      label: "CHILL",
    },
    {
      value: "WORKOUT",
      label: "WORKOUT",
    },
    {
      value: "PARTY",
      label: "PARTY",
    },
  ];

  useEffect(() => {
    if (trackUpload && trackUpload.fileUrl) {
      setInfo({
        ...info,
        trackUrl: trackUpload.fileUrl,
      });
    }
  }, [trackUpload]);

  const handleSaveInfo = async () => {
    const res = await sendRequest<IBackendRes<ITrackTop[]>>({
      url: "http://localhost:8000/api/v1/tracks",
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: info,
    });
    if (res.data) {
      setValue(0);
      toast.success("Create track successfully!");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <LinearWithValueLabel trackUpload={trackUpload} setValue={setValue} />
      <Grid container spacing={2} alignItems={"center"}>
        <Grid
          xs={4}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={1}
        >
          <div style={{ width: 250, height: 250, background: "#ccc" }}>
            {info.imageUrl && (
              <img
                height={250}
                width={250}
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imageUrl}`}
              />
            )}
          </div>
          <InputFileUpload info={info} setInfo={setInfo} />
        </Grid>
        <Grid xs={8} display={"flex"} flexDirection={"column"} gap={3}>
          <TextField
            value={info?.title}
            onChange={(e) => setInfo({ ...info, title: e.target.value })}
            label="Title"
            variant="standard"
            fullWidth
          />
          <TextField
            value={info?.description}
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
            label="Description"
            variant="standard"
            fullWidth
          />
          <TextField
            value={info?.category}
            onChange={(e) => setInfo({ ...info, category: e.target.value })}
            select
            variant="standard"
            label="Category"
            defaultValue="CHILL"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            sx={{ width: "fit-content" }}
            onClick={() => handleSaveInfo()}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Step2;
