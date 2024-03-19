using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Reservations;

namespace Selu383.SP24.Api.Features.Cities
{
    public class City
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<Hotel>? Hotels { get; set; }
       // public virtual ICollection<Reservation>? Reservations { get; set; }
    }
}
