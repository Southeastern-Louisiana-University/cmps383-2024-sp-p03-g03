using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Selu383.SP24.Api.Features.Cities
{
    public class CityConfiguration : IEntityTypeConfiguration<City>
    {
        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder
                .HasMany(x => x.Hotels)
                .WithOne(x => x.City)
                .HasForeignKey(x => x.CityId)
                .IsRequired();
        }
    }
}
