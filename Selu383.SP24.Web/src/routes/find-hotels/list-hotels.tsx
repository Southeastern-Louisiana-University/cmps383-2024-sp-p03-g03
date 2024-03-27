import { HotelDto } from "../../features/hotels/HotelDto";
import { useFetch } from "use-http";

export default function ListHotels() {
  const {
    data: hotels,
    loading,
    error,
  } = useFetch<HotelDto[]>("https://selu383-sp24-p03-g03.azurewebsites.net/api/hotels", {
    method: "get",
  });
  console.log(hotels);

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
      <a href="/" className="close-btn">
        Back Home
      </a>
      <ul>
        {hotels?.map((hotel) => (
          <li key={hotel.id}></li>
        ))}
      </ul>
    </div>
  );
}
