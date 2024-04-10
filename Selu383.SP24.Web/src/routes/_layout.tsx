import { useEffect, useState } from "react";
import "./layout.css";

import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import useFetch from "use-http";
import AuthContext from "../features/authentication/AuthContext";
import UserDto from "../features/authentication/UserDto";
import { Box, Modal, Button, IconButton, AppBar, Toolbar, Typography, Drawer, Divider, List, ListItem } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

export default function MainLayout() {
  const [currentUser, setCurrentUser] = useState<null | undefined | UserDto>(undefined);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleDrawer = (newOpenDrawer: boolean) => () => {
    setOpenDrawer(newOpenDrawer);
  };

  useEffect(() => {
    console.log("layout loaded");
  }, []);

  useFetch(
    "api/authentication/me",
    {
      onNewData: (_, x) => {
        console.log(x);
        if (typeof x === "object") {
          setCurrentUser(x);
        } else {
          setCurrentUser(null);
        }
      },
    },
    []
  );

  const DrawerList = (
    <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem></ListItem>
      </List>
      <Divider />
      <List>
        <ListItem></ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <AuthContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}></AuthContext.Provider>
      <AppBar position="fixed" sx={{ bgcolor: "#10b986" }}>
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)} size="large" edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </IconButton>
          <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 30 }}>
            EnStay
          </Typography>
          <IconButton onClick={handleOpen} size="large" edge="start" color="inherit" aria-label="menu">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 180,
            backgroundColor: "#d9d9d9",
            border: "2px solid #10b986",
            boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.5)",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            borderRadius: "8px",
          }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#10b986",
              "&:hover": {
                bgcolor: "#0a936e", // Adjust the shade to your preference
              },
            }}
            onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#10b986",
              "&:hover": {
                bgcolor: "#0a936e", // Adjust the shade to your preference
              },
            }}
            onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </Box>
      </Modal>
      <div className="body-content">
        <label htmlFor="search">Enter your location:</label>
        <input id="search" name="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value ?? "")}></input>
        <br />
        <Button
          variant="contained"
          sx={{
            bgcolor: "#10b986",
            "&:hover": {
              bgcolor: "#0a936e", // Adjust the shade to your preference
            },
          }}
          className="search-hotel-button"
          component={RouterLink}
          to={searchTerm ? `/find-hotel?searchTerm=${encodeURIComponent(searchTerm)}&start=now` : "#"}
          onClick={(e) => (!searchTerm ? e.preventDefault() : null)}
          aria-disabled={!searchTerm}>
          Search
        </Button>
        <br />
        <Button
          variant="contained"
          onClick={() => navigate("/hotels")}
          sx={{
            bgcolor: "#10b986",
            "&:hover": {
              bgcolor: "#0a936e", // Adjust the shade to your preference
            },
          }}>
          List Hotels
        </Button>
      </div>
    </div>
  );
}
