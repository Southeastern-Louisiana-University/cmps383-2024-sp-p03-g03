// RoomDto.ts
interface RoomDto {
    id: number;
    hotelId: number;
    beds: string;
    isAvailable: boolean;
    hotelName: string;
    // Other properties
}

export default RoomDto;