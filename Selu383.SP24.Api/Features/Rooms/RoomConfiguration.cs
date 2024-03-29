﻿using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Hotels;
using Microsoft.OpenApi.Models;

namespace Selu383.SP24.Api.Features.Rooms
{
    public class RoomConfiguration : IEntityTypeConfiguration<Room>
    {
        public void Configure(EntityTypeBuilder<Room> builder)
        {
            builder.Property(x => x.Beds)
                .HasMaxLength(120)
                .IsRequired();

            builder.Property(x => x.IsAvailable)
                .IsRequired();

            builder.HasKey(x => x.Id);

            builder.HasOne<Hotel>(x => x.Hotel)
                .WithMany(h => h.Rooms)
                .HasForeignKey(x => x.HotelId)
                .IsRequired();

            builder
                .HasOne<RoomType>(x => x.RoomType)
                .WithMany()
                .HasForeignKey(x => x.RoomTypeId)
                .IsRequired(false);
        }
    }
}