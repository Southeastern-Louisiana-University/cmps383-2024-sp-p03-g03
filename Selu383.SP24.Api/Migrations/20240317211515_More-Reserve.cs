﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Selu383.SP24.Api.Migrations
{
    /// <inheritdoc />
    public partial class MoreReserve : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HotelReservation");

            migrationBuilder.AddColumn<int>(
                name: "HotelId",
                table: "Reservation",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HotelName",
                table: "Reservation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_HotelId",
                table: "Reservation",
                column: "HotelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Hotel_HotelId",
                table: "Reservation",
                column: "HotelId",
                principalTable: "Hotel",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Hotel_HotelId",
                table: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_Reservation_HotelId",
                table: "Reservation");

            migrationBuilder.DropColumn(
                name: "HotelId",
                table: "Reservation");

            migrationBuilder.DropColumn(
                name: "HotelName",
                table: "Reservation");

            migrationBuilder.CreateTable(
                name: "HotelReservation",
                columns: table => new
                {
                    HotelsId = table.Column<int>(type: "int", nullable: false),
                    ReservationsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotelReservation", x => new { x.HotelsId, x.ReservationsId });
                    table.ForeignKey(
                        name: "FK_HotelReservation_Hotel_HotelsId",
                        column: x => x.HotelsId,
                        principalTable: "Hotel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HotelReservation_Reservation_ReservationsId",
                        column: x => x.ReservationsId,
                        principalTable: "Reservation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HotelReservation_ReservationsId",
                table: "HotelReservation",
                column: "ReservationsId");
        }
    }
}
