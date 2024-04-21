export interface RoomDto {
  id: number;
  hotelId: number;
  roomTypeId: number;
  beds: string;
  isAvailable: boolean;
}

export default RoomDto;
