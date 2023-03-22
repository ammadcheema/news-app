import React from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { navItems } from "./NavItemsData";
import { logout } from "../../redux/actions";
import { connect } from "react-redux";

const NavDrawer = ({ handleDrawerToggle, mobileOpen, user, handleLogout }) => {
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", paddingX: "30px" }}
    >
      <Typography variant="h6" sx={{ my: 2, color: "rgb(255, 192, 1)" }}>
        NewsApp
      </Typography>
      <Divider sx={{ marginY: "10px" }} />
      {user ? (
        <>
          <List>
            {navItems.map((item) => (
              <ListItem disablePadding key={item.name}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "14px",
                    }}
                    primary={item.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ marginY: "10px" }} />
          <List>
            <ListItem key="Login" disablePadding>
              <ListItemButton
                component={Link}
                to="/login"
                onClick={handleLogout}
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "14px",
                  }}
                  primary={"Logout"}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : (
        <List>
          <ListItem key="Login" disablePadding>
            <ListItemButton
              component={Link}
              to="/login"
              style={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "14px",
                }}
                primary={"Login"}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key="Signup" disablePadding>
            <ListItemButton
              component={Link}
              to="/signup"
              style={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "14px",
                }}
                primary={"Sign Up"}
              />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );
  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "block", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

const msp = ({ auth }) => ({ user: auth.user });
const mdp = (dispatch) => ({
  logoutUser: () => dispatch(logout()),
});
export default connect(msp, mdp)(NavDrawer);
