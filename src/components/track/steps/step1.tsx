"use client";
import { useDropzone, FileWithPath } from "react-dropzone";
import "./theme.scss";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

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
      onClick={(e) => e.preventDefault()}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}

interface IProps {
  setValue: (v: number) => void;
  setTrackUpload: (v: any) => void;
  trackUpload: {
    fileName: string;
    progress: number;
    fileUrl: string;
  };
}

function Step1(props: IProps) {
  const { data: session } = useSession();
  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles && acceptedFiles[0]) {
        props.setValue(1);
        const audio = acceptedFiles[0];
        const formData = new FormData();
        formData.append("fileUpload", audio);
        try {
          const res = await axios.post(
            "http://localhost:8000/api/v1/files/upload",
            formData,
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
                target_type: "tracks",
              },
              onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.floor(
                  (progressEvent.loaded * 100) / progressEvent.total!
                );
                props.setTrackUpload({
                  ...props.trackUpload,
                  fileName: acceptedFiles[0].name,
                  progress: percentCompleted,
                });
              },
            }
          );
          props.setTrackUpload((prevState: any) => ({
            ...prevState,
            fileUrl: res.data.data.fileName,
          }));
        } catch (error: any) {
          console.log(error?.response?.data?.message);
        }
      }
    },
    [session]
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      audio: [".mp3"],
    },
  });
  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <InputFileUpload />
        <p>Drag 'n' drop some files here, or click to select file</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default Step1;
