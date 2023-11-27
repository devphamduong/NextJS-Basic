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
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

interface IProps {
  trackUpload: {
    fileName: string;
    progress: number;
  };
}

function Step2(props: IProps) {
  const [category, setCategory] = useState("");
  const { trackUpload } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

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

  return (
    <>
      <LinearWithValueLabel trackUpload={trackUpload} />
      <Grid container spacing={2} alignItems={"center"}>
        <Grid
          xs={4}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={1}
        >
          <div style={{ width: 250, height: 250, background: "#ccc" }}></div>
          <InputFileUpload />
        </Grid>
        <Grid xs={8} display={"flex"} flexDirection={"column"} gap={3}>
          <TextField label="Title" variant="standard" fullWidth />
          <TextField label="Description" variant="standard" fullWidth />
          <TextField
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
          <Button variant="outlined" sx={{ width: "fit-content" }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Step2;
