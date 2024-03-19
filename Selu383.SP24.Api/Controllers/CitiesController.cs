using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Data;
using Selu383.SP24.Api.Features.Cities;
using System.Linq;

namespace Selu383.SP24.Api.Controllers
{
    [Route("api/cities")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly DbSet<City> cities;
        private readonly DataContext dataContext;

        public CitiesController(DataContext dataContext)
        {
            this.dataContext = dataContext;
            cities = dataContext.Set<City>();
        }

        [HttpGet]
        public IQueryable<CityDto> GetAllCities()
        {
            return GetCityDtos(cities);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<CityDto> GetCityById(int id)
        {
            var result = GetCityDtos(cities.Where(x => x.Id == id)).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        private IQueryable<CityDto> GetCityDtos(IQueryable<City> cities)
        {
            return cities
                .Select(x => new CityDto
                {
                    Id = x.Id,
                    Name = x.Name,
                });
        }
    }
}
