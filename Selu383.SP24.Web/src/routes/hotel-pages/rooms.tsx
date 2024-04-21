import React, { useContext, useEffect, useState } from "react";
import RoomDto from "../../features/hotel-dtos/RoomDto";
import useFetch from "use-http";
import { Box, Typography, CircularProgress, Card, CardActionArea, CardContent, CardMedia, AppBar, Button, IconButton, Modal, Toolbar, Tooltip } from "@mui/material";
import AuthContext from "../../features/authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import UserDto from "../../features/authentication/UserDto";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const RoomListComponent: React.FC = () => {
  const { data: rooms, loading, error, get } = useFetch<RoomDto[]>(`/api/rooms/byhotel/1`);
  const [currentUser, setCurrentUser] = useState<null | undefined | UserDto>(undefined);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUser();
      if (response) {
        setCurrentUser(response);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { get: fetchUser } = useFetch<UserDto>("api/authentication/me", { data: undefined });
  const { post } = useFetch("/api/authentication/logout", {
    onNewData: () => {
      authContext?.setUser(null);
    },
  });

  const handleLogout = async () => {
    setCurrentUser(null);

    try {
      await post();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    get();
  }, [get]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography variant="body1" color="error">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  // Filter unique rooms based on some property, for example, room type
  const uniqueRooms = Array.from(new Set(rooms?.map((room) => room.beds))).map((type) => {
    return rooms?.find((room) => room.beds === type);
  });

  return (
    <div>
      <AuthContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}></AuthContext.Provider>
      <AppBar position="fixed" sx={{ bgcolor: "#10b986" }}>
        <Toolbar>
          <Typography onClick={() => navigate("/")} align="left" variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 36, cursor: "pointer" }}>
            EnStay
          </Typography>
          <Tooltip title="Profile">
            <IconButton onClick={handleOpen} size="large" edge="start" color="inherit" aria-label="menu">
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
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
          {currentUser ? (
            <Button
              variant="contained"
              sx={{
                bgcolor: "#10b986",
                "&:hover": {
                  bgcolor: "#0a936e",
                },
              }}
              onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                bgcolor: "#10b986",
                "&:hover": {
                  bgcolor: "#0a936e",
                },
              }}
              onClick={() => navigate("/login")}>
              Login
            </Button>
          )}

          <Button
            variant="contained"
            sx={{
              bgcolor: "#10b986",
              "&:hover": {
                bgcolor: "#0a936e",
              },
            }}
            onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </Box>
      </Modal>

      <div className="room-list">
        {uniqueRooms.map((room) => (
          <Card className="room-card">
            {" "}
            <CardActionArea sx={{ height: "100%" }} onClick={() => {}}>
              <CardMedia component="img" height="150" image="https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg" alt="Hotel Image" sx={{ margin: "auto", display: "block" }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {room?.beds}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoomListComponent;
