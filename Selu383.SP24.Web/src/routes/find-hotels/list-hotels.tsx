import React, { useEffect } from "react";
import { useFetch } from "use-http";
import { HotelDto } from "../../features/hotels/HotelDto"; // Import the HotelDto interface
import { Card } from "@mui/material";
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
      <ul>
        {hotels &&
          hotels.map(
            (
              hotel: HotelDto // Specify the type of 'hotel' parameter
            ) => (
              <Card className="hotel-cards">
                <li key={hotel.id}>
                  <div>Name: {hotel.name}</div>
                  <div>Address: {hotel.address}</div>
                  {/* Add more hotel details as needed */}
                </li>
              </Card>
            )
          )}
      </ul>
    </div>
  );
};

export default ListHotels;
