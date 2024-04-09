// ListHotels.jsx
import { useEffect } from "react";
import { useFetch } from "use-http";
import { HotelDto } from "../../features/hotel-dtos/HotelDto"; // Import the HotelDto interface
import { AppBar, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Toolbar, Typography } from "@mui/material";
import "../layout.css";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const ListHotels = () => {
  const { data: hotels, loading, error, get } = useFetch<HotelDto[]>("/api/hotels");
  const navigate = useNavigate();

  useEffect(() => {
    get();
  }, [get]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <AppBar color="success" position="fixed">
        <Toolbar sx={{ padding: 1 }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <MenuIcon fontSize="inherit" />
          </IconButton>
          <Typography onClick={() => navigate("/")} align="center" variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 30, cursor: "pointer" }}>
            Hotels
          </Typography>
          <Button onClick={() => navigate("/")} variant="contained" color="success">
            Back Home
          </Button>
        </Toolbar>
      </AppBar>

      <div className="hotel-list">
        {hotels &&
          hotels.map((hotel: HotelDto) => (
            <Card className="hotel-card" sx={{ maxWidth: 400 }}>
              <CardActionArea key={hotel.id}>
                <CardMedia>
                  <img src="https://media.istockphoto.com/id/1084106348/photo/apartment-home-residential-building-complex-street-parking.jpg?s=612x612&w=0&k=20&c=CO0zL7cmvkw1r4mvEc0JTC9s2uyhYV9pOhuGuZF9NHU=" className="card-image" />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {hotel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {hotel.address}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ListHotels;
