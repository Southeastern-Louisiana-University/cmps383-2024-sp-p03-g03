// ListHotels.jsx
import { useEffect } from "react";
import { useFetch } from "use-http";
import { HotelDto } from "../../features/hotel-dtos/HotelDto"; // Import the HotelDto interface
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import "../layout.css";

const ListHotels = () => {
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

  return (
    <div>
      <h1>Hotel List</h1>
      <a href="/" className="close-btn">
        Back Home
      </a>
      <div className="hotel-list">
        {hotels &&
          hotels.map((hotel: HotelDto) => (
            <CardActionArea>
              <Card variant="outlined" key={hotel.id} className="hotel-card">
                <img src="https://media.istockphoto.com/id/1084106348/photo/apartment-home-residential-building-complex-street-parking.jpg?s=612x612&w=0&k=20&c=CO0zL7cmvkw1r4mvEc0JTC9s2uyhYV9pOhuGuZF9NHU=" className="card-image" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {hotel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {hotel.address}
                  </Typography>
                  {/* Add more hotel details as needed */}
                </CardContent>
              </Card>
            </CardActionArea>
          ))}
      </div>
    </div>
  );
};

export default ListHotels;
