// ReservationDto.ts
interface ReservationDto {
  id: number;
  checkIn: string;
  checkOut: string;
  reservationNumber: number;
  hotelName: string;
  roomId: number;
  userId: number;
  // Other properties
}

export default ReservationDto;
