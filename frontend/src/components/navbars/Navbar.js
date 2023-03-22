import React, { useState } from "react";
import NavDrawer from "./Drawer";
import { Menu } from "@mui/icons-material";
import {
  Stack,
  Grid,
  Button,
  Toolbar,
  AppBar,
  Box,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { navItems } from "./NavItemsData";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";

const NavBar = ({ user, logoutUser }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const handleDrawerToggle = (e) => {
    e.preventDefault();
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppBar
          component="nav"
          position="sticky"
          style={{ background: "#ffff" }}
        >
          <Toolbar direction="row">
            <IconButton
              color="black"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
              }}
            >
              <Menu />
            </IconButton>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "flex",
                },
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                <Box
                  component={Link}
                  to="/"
                  sx={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    mt: 14,
                    color: "black",
                    "&:hover": { color: "#FEC20C" },
                  }}
                >
                  <img
                    style={{ width: 150 }}
                    alt="News logo"
                    src={`${window.location.origin}/newsLogo.png`}
                  />
                </Box>
              </Grid>
              {user ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={7}
                  xl={7}
                  spacing={4}
                  sx={{
                    mt: 4,
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "inline",
                      xl: "inline",
                    },
                  }}
                >
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      component={Link}
                      to={item.path}
                      disableRipple
                      className={classes.links}
                      sx={{ color: "black" }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            <Box
              sx={{
                margin: "auto",
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "flex",
                  lg: "none",
                  xl: "none",
                },
              }}
            >
              <Box
                component={Link}
                to="/"
                sx={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "black",
                  "&:hover": { color: "#FEC20C" },
                }}
              >
                <img
                  style={{ width: 120 }}
                  alt="News logo"
                  src={`${window.location.origin}/newsLogo.png`}
                />
              </Box>
            </Box>

            <Box
              sx={{
                ml: 1,
                mb: { xs: 0.8, sm: 0.8, md: 0.8, lg: 0 },
                mt: { lg: 3.2 },
                display: "flex",
              }}
            >
              {user ? (
                <Box
                  sx={{
                    ml: 1,
                    p: 1,
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "flex",
                      xl: "flex",
                    },
                  }}
                >
                  <Button
                    component={Link}
                    onClick={handleLogout}
                    disableRipple
                    sx={{
                      color: "white",
                      ml: 1,
                      width: "100px",
                      height: "40px",
                      backgroundColor: "black",
                      "&:hover": { backgroundColor: "#FEC20C" },
                    }}
                    variant="outlined"
                    to="/login"
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    ml: 1,
                    py: 1,
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "flex",
                      xl: "flex",
                    },
                  }}
                >
                  <Button
                    component={Link}
                    disableRipple
                    sx={{
                      color: "black",
                      width: "100px",
                      height: "40px",
                      borderColor: "black",
                      "&:hover": { backgroundColor: "#FEC20C" },
                    }}
                    variant="outlined"
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    disableRipple
                    sx={{
                      color: "white",
                      ml: 1,
                      width: "100px",
                      height: "40px",
                      backgroundColor: "black",
                      "&:hover": { backgroundColor: "#FEC20C" },
                    }}
                    variant="contained"
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <NavDrawer
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          handleLogout={handleLogout}
        />
      </Stack>
    </>
  );
};

const useStyles = makeStyles({
  flexGrow: {
    flex: "1",
  },
  links: {
    fontSize: "16px !important",
    color: "black",
    textTransform: "none !important",
    "&:hover": {
      backgroundColor: "transparent !important",
      color: "rgb(255, 192, 1)",
    },
  },
  buttonLink: {
    display: "flex",
    marginLeft: "30px",
    width: "auto",
  },
  dropdownItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    fontWeight: "400",
    lineHeight: "1.42857143",
    color: "black",
    whiteSpace: "nowrap",
    height: "unset",
    "&:hover": {
      backgroundColor: "white",
      color: "rgb(255, 192, 1)",
    },
  },
});

const msp = ({ auth }) => ({ user: auth.user });
const mdp = (dispatch) => ({
  logoutUser: () => dispatch(logout()),
});

export default connect(msp, mdp)(NavBar);
