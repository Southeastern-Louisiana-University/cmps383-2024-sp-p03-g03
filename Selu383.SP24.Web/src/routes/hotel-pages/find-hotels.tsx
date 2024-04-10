import { useNavigate, useSearchParams } from "react-router-dom";
import { HotelDto } from "../../features/hotel-dtos/HotelDto";
import { useFetch } from "use-http";
import { Card, CardActionArea, CardMedia, CardContent, Typography, AppBar, Button, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function FindHotel() {
  const [params] = useSearchParams();
  const searchTerm = params.get("searchTerm");
  const navigate = useNavigate();

  const {
    data: hotels,
    loading,
    error,
  } = useFetch<HotelDto[]>(
    "/api/hotels/find",
    {
      method: "post",
      body: {
        searchTerm: searchTerm,
      },
    },
    [searchTerm]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error... <button type="button"> try again</button>
      </div>
    );
  }

  return (
    <div>
      <AppBar sx={{ bgcolor: "#10b986" }} position="fixed">
        <Toolbar sx={{ padding: 1 }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <MenuIcon fontSize="inherit" />
          </IconButton>
          <Typography onClick={() => navigate("/")} align="center" variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 30, cursor: "pointer" }}>
            Hotels in your area
          </Typography>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{
              bgcolor: "#10b986",
              "&:hover": {
                bgcolor: "#0a936e", // Adjust the shade to your preference
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
                  <img src="https://media.istockphoto.com/id/1084106348/photo/apartment-home-residential-building-complex-street-parking.jpg?s=612x612&w=0&k=20&c=CO0zL7cmvkw1r4mvEc0JTC9s2uyhYV9pOhuGuZF9NHU=" className="card-image" />
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
}
