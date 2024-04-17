import { useNavigate, useSearchParams } from "react-router-dom";
import { HotelDto } from "../../features/hotel-dtos/HotelDto";
import { useFetch } from "use-http";
import { Card, CardActionArea, CardMedia, CardContent, Typography, AppBar, Button, Toolbar } from "@mui/material";

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
          <Typography onClick={() => navigate("/")} align="left" variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 30, cursor: "pointer" }}>
            Hotels in your area
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
                  <img src="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg" className="card-image" />
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
