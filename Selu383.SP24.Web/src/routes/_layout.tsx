import { useEffect, useState } from "react";
import "./layout.css";

import { useNavigate } from "react-router-dom";
import useFetch from "use-http";
import AuthContext from "../features/authentication/AuthContext";
import UserDto from "../features/authentication/UserDto";
import { Box, Modal, Button, IconButton, AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

export default function MainLayout() {
  const [currentUser, setCurrentUser] = useState<null | undefined | UserDto>(undefined);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <AuthContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}></AuthContext.Provider>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="success" position="static">
          <Toolbar sx={{ padding: 1 }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu">
              <MenuIcon fontSize="inherit" />
            </IconButton>
            <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 30 }}>
              EnStay
            </Typography>
            <IconButton onClick={handleOpen} size="large" edge="start" color="inherit" aria-label="menu">
              <AccountCircleIcon fontSize="inherit" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/signup")}>Sign up</Button>
        </Box>
      </Modal>

      <div className="body-content">
        <label className="location-label" htmlFor="search">
          Start by finding hotels!
        </label>
        <br />
        <Button className="button" onClick={() => navigate("/hotels")} variant="contained" color="success">
          List Hotels
        </Button>
      </div>
    </>
  );
}
