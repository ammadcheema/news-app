import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { setModalOpen, thunkLogin } from "../../redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetError } from "../../redux/actions/error.action";

const Login = ({ loginUser, setModalOpen,error,isError,resetError }) => {
  
  useEffect(()=>{
    resetError()
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userLogin = {
      email: data.get("email"),
      password: data.get("password"),
    };
    loginUser({ ...userLogin, from: "handleSubmit-Login" });
    setModalOpen();
  };

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #eeeeee",
          marginTop: "50px",
          padding: "10px",
          width: { md: "40vw", xs: "90vw" },
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#FEC20C" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight={"bold"}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                error = {isError && (error.email)}
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Box sx={{margin:"2px", padding:"2px", color: "red"}}>
              {error.email}
             </Box>
              <Grid item xs={12}>
                <TextField
                error = {isError && (error.password)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type= "password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Box sx={{margin:"2px", padding:"2px", color: "red"}}>
              {error.password}
            </Box>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 10,
                mb: 2,
                "&:hover": { opacity: 2, backgroundColor: "#FEC20C" },
                backgroundColor: "#FEC20C",
              }}
            >
              Login
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Box
                  component={Link}
                  to="/signup"
                  sx={{
                    color: "black",
                    textDecoration: "none",
                    "&:hover": { color: "#FEC20C" },
                    fontSize: "12px",
                  }}
                >
                  Back to Signup
                </Box>
              </Grid>
              <Grid item>
                <Box
                  component={Link}
                  to="#"
                  sx={{
                    color: "black",
                    textDecoration: "none",
                    "&:hover": { color: "#FEC20C" },
                    fontSize: "12px",
                  }}
                >
                  Forget Password?
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
const msp = ({error}) => ({
  error: error.error,
  isError: error.isError,
});

const mdp = (dispatch) => ({
  loginUser: (email, password, from) =>
    dispatch(thunkLogin(email, password, from)),
  setModalOpen: () => dispatch(setModalOpen()),
  resetError: () =>
    dispatch(resetError()),
});

export default connect(msp, mdp)(Login);
