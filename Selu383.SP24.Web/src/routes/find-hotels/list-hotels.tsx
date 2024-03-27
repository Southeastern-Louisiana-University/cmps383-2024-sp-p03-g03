import { Link } from "react-router-dom";
import { HotelDto } from "../../features/hotels/HotelDto";
import { useFetch } from "use-http";

export default function ListHotels() {
  const {
    data: hotels,
    loading,
    error,
  } = useFetch<HotelDto[]>("https://selu383-sp24-p03-g03.azurewebsites.net/api/hotels", {
    method: "post",
  });

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
      <div>Found these hotels</div>
      <ul>
        {hotels?.map((hotel) => (
          <li key={hotel.id}>
            <Link to={`/hotel-details/${hotel.id}`}>{hotel.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
