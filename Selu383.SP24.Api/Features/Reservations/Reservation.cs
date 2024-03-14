using Microsoft.VisualBasic;
using Selu383.SP24.Api.Features.Cities;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Features.Reservations
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }

        public int ReservationNumber { get; set; }
        public Room? Room { get; set; }

        public City? City => Room?.Hotel?.City;
    }
}
