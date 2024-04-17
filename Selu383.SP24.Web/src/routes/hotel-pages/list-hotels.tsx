// ListHotels.jsx
import { useEffect } from "react";
import { useFetch } from "use-http";
import { HotelDto } from "../../features/hotel-dtos/HotelDto";
import { AppBar, Button, Card, CardActionArea, CardContent, CardMedia, Toolbar, Typography } from "@mui/material";
import "../layout.css";
import { useNavigate } from "react-router-dom";

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
      <AppBar sx={{ bgcolor: "#10b986" }} position="fixed">
        <Toolbar sx={{ padding: 1 }}>
          <Typography onClick={() => navigate("/")} align="left" variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 30, cursor: "pointer" }}>
            All Hotels
          </Typography>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{
              bgcolor: "#10b986",
              "&:hover": {
                bgcolor: "#0a936e",
              },
            }}>
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <div className="hotel-list">
        {hotels &&
          hotels.map((hotel: HotelDto) => (
            <Card className="hotel-card" sx={{ maxWidth: 400 }}>
              <CardActionArea key={hotel.id}>
                <CardMedia>
                  <img src="src\assets\istockphoto-1084106348-612x612.jpg" className="card-image" />
                </CardMedia>
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
  );
};

export default ListHotels;
