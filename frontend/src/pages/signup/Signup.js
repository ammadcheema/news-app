import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { thunkSignUp } from "../../redux/actions";
import { connect } from "react-redux";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { resetError } from "../../redux/actions/error.action";

const SignUp = ({ registerUser, error, isError,resetError }) => {
 
  useEffect(()=>{
    resetError()
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userRegister = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("confirmPassword"),
    };
    console.log(userRegister);
    registerUser({ ...userRegister, from: "handleSubmit-SignUp" });
    
  };

  return (
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error = {isError && error.name}
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="name"
                autoFocus
              />
            </Grid>
            <Box sx={{margin:"2px", padding:"2px", color: "red"}}>
              {error.name}
            </Box>
            <Grid item xs={12}>
              <TextField
                error = {isError && error.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Box sx={{margin:"2px", padding:"2px", color: "red"}}>
              {error.email}
            </Box>
            <Grid item xs={12}>
              <TextField
               error = {isError && (error.password || error.password_confirmation)}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputProps={{   
                  minLength: 8,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {isError && (error.password || error.password_confirmation)}
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                inputProps={{
                  minLength: 8,
                }}
              />
            </Grid>
            <Box sx={{margin:"2px", padding:"2px", color: "red"}}>
              {isError && error.password.map((i )=>(
                <Box>{i}</Box>))}
            </Box>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" />}
                label="Please accept our privacy policy"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#FEC20C",
              "&:hover": { backgroundColor: "#FCA510" },
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Box
                component={Link}
                to="/login"
                sx={{
                  color: "black",
                  textDecoration: "none",
                  "&:hover": { color: "#FEC20C" },
                  fontSize: "12px",
                }}
              >
                Already have an account? Sign in
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

const msp = ({ auth, error }) => ({
  user: auth.user,
  error: error.error,
  isError: error.isError,
});

const mdp = (dispatch) => ({
  registerUser: (name, email, password, from) =>
    dispatch(thunkSignUp(name, email, password, from)),
  resetError: () =>
    dispatch(resetError()),
});

export default connect(msp, mdp)(SignUp);
