"use client";
import { Box, Chip, Divider, IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { signIn } from "next-auth/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>("admin@gmail.com");
  const [password, setPassword] = useState<string>("123456");
  const [isValidUsername, setIsValidUsername] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSignIn = async () => {
    setIsValidUsername(username ? true : false);
    setIsValidPassword(password ? true : false);
    if (username && password) {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res?.error) {
        setOpen(true);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container justifyContent="center">
          <Grid
            xs={11}
            sm={6}
            container
            spacing={2}
            sx={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              padding: "10px",
            }}
          >
            <div style={{ margin: "20px" }}>
              <Link href={"/"}>
                <ArrowBackIcon />
              </Link>
            </div>
            <Grid xs={12}>
              <div style={{ textAlign: "center" }}>
                <LockPersonIcon color="action" sx={{ height: 50, width: 50 }} />
                <div>Sign In</div>
              </div>
            </Grid>
            <Grid xs={12}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                required
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                helperText={
                  !isValidUsername ? "Please enter your user name" : ""
                }
                error={!isValidUsername}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSignIn();
                  }
                }}
                helperText={
                  !isValidPassword ? "Please enter your password" : ""
                }
                error={!isValidPassword}
                type={!showPassword ? "password" : "text"}
                id="outlined-start-adornment"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSignIn()}
              >
                Sign In
              </Button>
            </Grid>
            <Grid xs={12}>
              <Divider>
                <Chip label="Or using" />
              </Divider>
            </Grid>
            <Grid
              xs={12}
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <div
                onClick={() => signIn("github")}
                style={{ cursor: "pointer" }}
              >
                <GitHubIcon
                  titleAccess="Sign in with GitHub"
                  sx={{ height: 35, width: 35 }}
                />
              </div>
              <div style={{ cursor: "pointer" }}>
                <GoogleIcon
                  titleAccess="Sign in with Google"
                  sx={{ height: 35, width: 35 }}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={"top" + "center"}
        onClose={handleClose}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Incorrect Username or Password!
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignInPage;
