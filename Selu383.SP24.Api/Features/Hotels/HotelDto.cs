using Selu383.SP24.Api.Features.Cities;
using System.Runtime.CompilerServices;

namespace Selu383.SP24.Api.Features.Hotels;

public class HotelDto
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }

    public int? ManagerId { get; set; }

    public string? CityName { get; set; }

}
