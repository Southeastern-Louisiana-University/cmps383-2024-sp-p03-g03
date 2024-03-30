// ListHotels.jsx
import { useEffect } from "react";
import { useFetch } from "use-http";
import { HotelDto } from "../../features/hotels/HotelDto"; // Import the HotelDto interface
import { Card, CardContent, Typography } from "@mui/material";
import "../layout.css";

const ListHotels = () => {
  const { data: hotels, loading, error, get } = useFetch<HotelDto[]>("/api/hotels");

  useEffect(() => {
    get(); // Fetch data when component mounts
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
      <div className="hotel-list">
        {hotels &&
          hotels.map((hotel: HotelDto) => (
            <Card key={hotel.id} className="hotel-card">
              <img
                src="Hotel-Picture.jpg" // Placeholder image URLs
                alt="Hotel Placeholder"
                className="card-image"
              />
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
          ))}
      </div>
    </div>
  );
};

export default ListHotels;
