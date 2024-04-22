import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, AppBar, Toolbar, Tooltip, IconButton, Modal } from "@mui/material";
import ReservationDto from "../../features/hotel-dtos/ReservationDto";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserDto from "../../features/authentication/UserDto";
import AuthContext from "../../features/authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useFetch from "use-http";

export default function BookingForm() {
  const location = useLocation();
  const roomId = location.state?.roomId || 0;

  const initialFormData: ReservationDto = {
    id: 0,
    checkIn: "",
    checkOut: "",
    reservationNumber: 0,
    roomId,
    userId: 0,
    hotelName: "",
  };

  const [formData, setFormData] = useState<ReservationDto>(initialFormData);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<null | undefined | UserDto>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true); // Start form submission

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Reservation submitted successfully");
      } else {
        console.error("Failed to submit reservation");
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
    } finally {
      setSubmitting(false); // Finish form submission
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ paddingTop: "200px" }}>
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

      <Box p={2}>
        <form onSubmit={handleSubmit} className="reservation-form">
          <input type="hidden" name="roomId" value={roomId} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="checkIn"
                label="Check-in Date"
                type="date"
                value={formData.checkIn}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="checkOut"
                label="Check-out Date"
                type="date"
                value={formData.checkOut}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                // type="submit"
                variant="contained"
                disabled={submitting}
                sx={{
                  bgcolor: "#10b986",
                  "&:hover": {
                    bgcolor: "#0a936e",
                  },
                }}>
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
