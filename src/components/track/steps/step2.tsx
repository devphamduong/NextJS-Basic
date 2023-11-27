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

function LinearWithValueLabel() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <span>You're uploading track:</span>
      <LinearProgressWithLabel value={progress} />
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

function InputFileUpload() {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}

function Step2() {
  return (
    <>
      <LinearWithValueLabel />
      <Grid container spacing={2} alignItems={"center"}>
        <Grid
          xs={4}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={1}
        >
          <div style={{ width: 300, height: 300, background: "#ccc" }}></div>
          <InputFileUpload />
        </Grid>
        <Grid xs={8} display={"flex"} flexDirection={"column"} gap={3}>
          <TextField label="Title" variant="standard" fullWidth />
          <TextField label="Description" variant="standard" fullWidth />
          <TextField label="Category" variant="standard" fullWidth />
          <Button variant="outlined" sx={{ width: "fit-content" }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Step2;
