import React, { useEffect } from "react";
import SearchBox from "../news/Search";
import DropDownCheckbox from "../settings/DropDownCheckbox";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import "./TopHeadlineFilter.css";
import { setModalOpen } from "../../redux/actions";
import { connect } from "react-redux";

const TopHeadlineFilter = ({
  toggleSearch,
  selected,
  handleSortChange,
  sortByData,
  handleSearchChange,
  sourcesData,
  sources,
  handleToggleSearch,
  searchByData,
  handleSetSources,
  setModalOpen,
}) => {
  const handleClickOpen = () => {
    setModalOpen();
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", pt: 1, mb: 1 }}>
        <Box className="mask-box" sx={{ xs: "40vw", md: "20vw" }}>
          <Box
            className="mask"
            sx={{
              width: { xs: "20vw", md: "10vw" },
              transform: {
                xs: `translateX(${
                  toggleSearch === "searchCategory" ? 0 : "20vw"
                })`,
                md: `translateX(${
                  toggleSearch === "searchCategory" ? 0 : "10vw"
                })`,
              },
            }}
          />
          <Button
            disableRipple
            variant="text"
            sx={{
              width: { xs: "20vw", md: "10vw" },
              color: toggleSearch === "searchCategory" ? "#ffffff" : "black",
              fontSize: "12px",
            }}
            onClick={() => handleToggleSearch("searchCategory")}
          >
            Category
          </Button>
          <Button
            disableRipple
            variant="text"
            sx={{
              width: { xs: "20vw", md: "10vw" },
              color: toggleSearch === "searchSource" ? "#ffffff" : "black",
              fontSize: "12px",
            }}
            onClick={() => handleToggleSearch("searchSource")}
          >
            Source
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: "bold", mr: 1 }}>
          Sort By :
        </Typography>
        <Select value={selected} size="small" onChange={handleSortChange}>
          {sortByData.map((list) => (
            <MenuItem
              key={list.name}
              value={list.value}
              sx={{ fontSize: "14px" }}
            >
              {list.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pb: 1,
        }}
      >
        <SearchBox handleSearchChange={handleSearchChange} />
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
        }}
      >
        <Select
          value={toggleSearch}
          size="small"
          onChange={handleToggleSearch}
          border="none"
          sx={{ width: "90%" }}
        >
          {searchByData.map((list) => (
            <MenuItem
              key={list.name}
              value={list.value}
              sx={{ fontSize: "14px" }}
            >
              {list.name}
            </MenuItem>
          ))}
        </Select>
      </Box> */}
      {toggleSearch === "searchSource" ? (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DropDownCheckbox
            title={"Sources"}
            data={sourcesData}
            value={sources}
            handleSet={handleSetSources}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Box
            component={Button}
            onClick={handleClickOpen}
            size="small"
            sx={{
              ml: 1,
              p: 1,
              display: "flex",
              textDecoration: "none",
              backgroundColor: "#FEC20C",
              color: "black",
              cursor: "pointer",
              width: "80%",
              "&:hover": { backgroundColor: "black", color: "white" },
            }}
          >
            <SettingsSuggestIcon
              sx={{
                width: { xs: "30px", md: "50px" },
                fontSize: { xs: "12px", md: "12px" },
                height: { xs: "20px", md: "30px" },
              }}
            />
            <Typography sx={{ fontSize: "16px", paddingTop: "2px" }}>
              More Filter
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

const msp = ({ preference }) => ({});
const mdp = (dispatch) => ({
  setModalOpen: () => dispatch(setModalOpen()),
});

export default connect(msp, mdp)(TopHeadlineFilter);
