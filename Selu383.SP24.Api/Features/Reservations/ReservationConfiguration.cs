﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Selu383.SP24.Api.Features.Reservations
{
    public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder)
        {
            builder
                .HasOne(r => r.Room)
                .WithMany(h => h.Reservations)
                .HasForeignKey(r => r.RoomId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            /* builder
                .HasOne(r => r.City)
                .WithMany(c => c.Reservations)
                .HasForeignKey(r => r.CityId)
                .IsRequired(); */
        }
    }
}
