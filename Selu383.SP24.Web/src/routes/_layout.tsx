import { useEffect, useState, useContext } from "react";
import "./layout.css";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import useFetch from "use-http";
import AuthContext from "../features/authentication/AuthContext";
import UserDto from "../features/authentication/UserDto";
import { Box, Modal, Button, IconButton, AppBar, Toolbar, Typography, Snackbar, Alert, Tooltip, Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import HotelDto from "../features/hotel-dtos/HotelDto";

export default function MainLayout() {
  const [currentUser, setCurrentUser] = useState<null | undefined | UserDto>(undefined);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [showLoginSnackbar, setShowLoginSnackbar] = useState(false);
  const [showLogoutSnackbar, setShowLogoutSnackbar] = useState(false);
  const authContext = useContext(AuthContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUser();
      if (response) {
        setCurrentUser(response);
        setShowLoginSnackbar(true);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { get: fetchUser } = useFetch<UserDto>("api/authentication/me", { data: undefined });
  const { post } = useFetch("/api/authentication/logout", {
    onNewData: () => {
      authContext?.setUser(null);
      setShowLogoutSnackbar(true);
    },
  });

  const handleLogout = async () => {
    setCurrentUser(null);

    try {
      await post();
      setShowLogoutSnackbar(true);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const { data: hotels, loading, error, get } = useFetch<HotelDto[]>("/api/hotels");

  useEffect(() => {
    get();
  }, [get]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm) {
      window.location.href = `/find-hotel?searchTerm=${encodeURIComponent(searchTerm)}&start=now`;
    }
  };

  return (
    <div>
      <AuthContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}></AuthContext.Provider>
      <AppBar position="fixed" sx={{ bgcolor: "#10b986" }}>
        <Toolbar>
          <Typography align="left" variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 36 }}>
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
      <Snackbar open={showLoginSnackbar} autoHideDuration={2800} onClose={() => setShowLoginSnackbar(false)}>
        <Alert variant="filled" sx={{ width: "100%", bgcolor: "#10b986" }}>
          You are logged in as: {currentUser?.userName}
        </Alert>
      </Snackbar>
      <Snackbar open={showLogoutSnackbar} autoHideDuration={2800} onClose={() => setShowLogoutSnackbar(false)}>
        <Alert variant="filled" sx={{ width: "100%", bgcolor: "#ff3333" }}>
          You have been logged out.
        </Alert>
      </Snackbar>

      <div className="body">
        <div className="body-content">
          <Card className="search-card">
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}>
              <label htmlFor="search" className="search-bar-text">
                Where?
              </label>
              <input id="search" className="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value ?? "")} onKeyPress={handleKeyPress} />
              <IconButton
                size="small"
                sx={{
                  bgcolor: "#10b986",
                  "&:hover": {
                    bgcolor: "#0a936e",
                  },
                  color: "white",
                  marginRight: "10px",
                }}
                component={RouterLink}
                to={searchTerm ? `/find-hotel?searchTerm=${encodeURIComponent(searchTerm)}&start=now` : "#"}
                onClick={(e) => {
                  if (!searchTerm) {
                    e.preventDefault();
                  }
                }}
                aria-disabled={!searchTerm}>
                <SearchIcon />
              </IconButton>
            </div>
          </Card>

          <div className="hotel-list">
            {hotels &&
              hotels.map((hotel: HotelDto) => (
                <Card key={hotel.id} className="hotel-card">
                  {" "}
                  {/* Added key prop */}
                  <CardActionArea sx={{ height: "100%" }}>
                    <CardMedia component="img" height="150" image="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg" alt="Hotel Image" sx={{ margin: "auto", display: "block" }} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {hotel.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Address: {hotel.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        City: {hotel.cityName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
