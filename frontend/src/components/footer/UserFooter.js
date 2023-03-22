import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { navItems } from "../navbars/NavItemsData";

const UserFooter = () => {
  return (
    <FooterWrap
      sx={{
        padding: "12px",
        backgroundColor: "black",
        marginTop: "auto",
        position: "absoulte",
        width: "100%",
      }}
    >
      <Container fixed maxWidth={false} sx={{ textAlign: "center" }}>
        <Box
          component={Link}
          to="/"
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            textDecoration: "none",
            color: "white",
            marginY: "20px",
            "&:hover": { color: "#FEC20C" },
          }}
        >
          News App
        </Box>
        {/* Desktop Footer */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            typography: "body1",
            marginTop: "50px",
            marginBottom: "10px",
            "& .menulinksfooter": {
              color: "#FEC20C",
              textDecoration: "none",
              fontSize: 18,
              lineHeight: "0px",
              display: { xs: "none", md: "block" },
            },
            "& .menulinksfooter:hover": {
              color: "#FFC001",
            },
            "& > :not(style) + :not(style)": {
              ml: 3,
            },
          }}
        >
          {navItems.map((page) => (
            <Link key={page.name} to={page.path} className="menulinksfooter">
              {page.name}
            </Link>
          ))}
        </Box>

        <Box className="MobileFooterContent" sx={{ textAlign: "center" }}>
          <Box
            className="MobileFooter"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Grid container justifyContent="center">
              <Grid
                item
                direction={"column"}
                sx={{
                  paddingRight: "20px",
                  borderRight: "2px solid #FEC20C",
                }}
              >
                <Box
                  className="Achors"
                  sx={{
                    fontFamily: "sans-serif",
                    fontStyle: "normal",
                    textDecoration: "none",
                  }}
                >
                  {navItems.map((page) => (
                    <Link
                      key={page.name}
                      to={page.path}
                      className="menulinksfooter"
                    >
                      {page.name}
                    </Link>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Typography sx={{ mt: 3, fontSize: "10px", color: "#FEC20C" }}>
          Copyrights {new Date().getFullYear()} © News App. All Rights Reserved
        </Typography>
      </Container>
    </FooterWrap>
  );
};

const FooterWrap = styled(Box)`
  & .Achors {
    display: flex;
    flex-direction: column;
    align-items: left;
    background-size: 2% 50% !important;
    background-position: 100px 28px !important;
    background-repeat: no-repeat !important;
    justify-content: space-evenly !important;
    padding-left: 2%;
    text-align: left;
    font-style: normal !important;
  }
  & .Achors > a {
    text-decoration: none;
    font-style: normal !important;
    font-weight: 600;
    font-size: 14px;
    line-height: 28px;
    color: #fec20c;
  }
  & .Achors > a:hover {
    color: #ffc001 !important;
  }
  @media screen and (max-width: 899px) {
    .logo-img {
      width: 359px;
      height: auto;
    }
    .MobileFooter {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center !important;
      text-decoration: none !important;
    }
    .MobileFooter {
      font-family: "sans-serif";
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 32px;
      letter-spacing: 0.05em;
      color: #000000;
      opacity: 0.75;
      position: relative;
    }
    .copyRight {
      font-family: "sans-serif" !important;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 30px;
      letter-spacing: 0.02em;
      text-align: center;
      color: #000000;
      text-decoration: none !important;
    }
    & .Achors > a:hover {
      color: #ffc001;
    }
  }
  @media screen and (max-width: 425px) {
    .logo-img {
      width: 280px;
      height: auto;
    }
  }
  @media screen and (min-width: 900px) {
    .MobileFooter {
      display: none !important;
    }
  }
`;

export default UserFooter;
