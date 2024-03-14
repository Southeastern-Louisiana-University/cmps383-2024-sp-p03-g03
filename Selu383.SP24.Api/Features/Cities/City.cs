using Selu383.SP24.Api.Features.Hotels;

namespace Selu383.SP24.Api.Features.Cities
{
    public class City
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<Hotel>? Hotels { get; set; }
    }
}
