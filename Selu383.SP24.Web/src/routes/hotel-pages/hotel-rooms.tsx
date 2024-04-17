import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "use-http";
import RoomDto from "../../features/hotel-dtos/RoomDto";

function HotelRoomsPage() {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);

  const { data, loading, error, get } = useFetch<RoomDto[]>(`/api/rooms/byhotel/${hotelId}`);

  useEffect(() => {
    get();
  }, [get, hotelId]);

  useEffect(() => {
    if (data) {
      setRooms(data);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Rooms Available for Hotel {hotelId}</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default HotelRoomsPage;
