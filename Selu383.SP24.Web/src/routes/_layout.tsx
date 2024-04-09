import { useEffect, useState } from "react";
import "./layout.css";

import { useNavigate } from "react-router-dom";
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
    <>
      <AuthContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}></AuthContext.Provider>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="success" position="fixed">
          <Toolbar sx={{ padding: 1 }}>
            <IconButton onClick={toggleDrawer(true)} size="large" edge="start" color="inherit" aria-label="menu">
              <MenuIcon fontSize="inherit" />
              <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
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
          <Button variant="contained" color="success" onClick={() => navigate("/login")}>
            Login
          </Button>

          <Button variant="contained" color="success" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </Box>
      </Modal>
      <div className="body-content">
        <Button onClick={() => navigate("/hotels")} variant="contained" color="success">
          List Hotels
        </Button>
      </div>
    </>
  );
}
