using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Selu383.SP24.Api.Features.Authorization;
using Selu383.SP24.Api.Features.Cities;
using Selu383.SP24.Api.Features.Hotels;
using Selu383.SP24.Api.Features.Reservations;
using Selu383.SP24.Api.Features.Rooms;

namespace Selu383.SP24.Api.Data;

public static class SeedHelper
{
    public static async Task MigrateAndSeed(IServiceProvider serviceProvider)
    {
        var dataContext = serviceProvider.GetRequiredService<DataContext>();

        await dataContext.Database.MigrateAsync();

        await AddRoles(serviceProvider);
        await AddUsers(serviceProvider);

        await AddCities(dataContext);
        await AddHotels(dataContext);
        await AddRoomTypes(dataContext);
        await AddRooms(dataContext);
        await AddReservations(dataContext);
    }

    private static async Task AddUsers(IServiceProvider serviceProvider)
    {
        const string defaultPassword = "Password123!";
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        if (userManager.Users.Any())
        {
            return;
        }

        var adminUser = new User
        {
            UserName = "galkadi"
        };
        await userManager.CreateAsync(adminUser, defaultPassword);
        await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

        var bob = new User
        {
            UserName = "bob"
        };
        await userManager.CreateAsync(bob, defaultPassword);
        await userManager.AddToRoleAsync(bob, RoleNames.User);

        var sue = new User
        {
            UserName = "sue"
        };
        await userManager.CreateAsync(sue, defaultPassword);
        await userManager.AddToRoleAsync(sue, RoleNames.User);
    }

    private static async Task AddRoles(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
        if (roleManager.Roles.Any())
        {
            return;
        }
        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.Admin
        });

        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.User
        });
    }

    private static async Task AddHotels(DataContext dataContext)
    {
        var hotels = dataContext.Set<Hotel>();

        if (await hotels.AnyAsync())
        {
            return;
        }
        var cities = await dataContext.Set<City>().ToListAsync();
        for (int i = 0; i < 4; i++)
        {
            var randomCity = cities[new Random().Next(cities.Count)];
            dataContext.Set<Hotel>()
                .Add(new Hotel
                {
                    Name = "Hammond " + i,
                    Address = "1234 Place st",
                    CityId = randomCity.Id
                });
        }

        await dataContext.SaveChangesAsync();
    }

    private static async Task AddCities(DataContext dataContext) 
    {
        var cities = dataContext.Set<City>();

        if (await cities.AnyAsync())
        {
            return;
        }

        for (int i = 0; i < 3; i++) 
        {
            dataContext.Set<City>()
                .Add(new City 
            { 
                Name = "City " + i
            });
        }

        await dataContext.SaveChangesAsync();
    }

    private static async Task AddRoomTypes(DataContext dataContext) 
    {
        var roomTypes = dataContext.Set<RoomType>();

        if (await roomTypes.AnyAsync()) 
        {
            return;
        }

        var predefinedRooms = new List<RoomType> 
        {
            new RoomType { Name = "Twin Bed", NumberOfBeds = 2},
            new RoomType { Name = "Queen Bed", NumberOfBeds = 2},
            new RoomType { Name = "King Bed", NumberOfBeds = 1}
        };

        await roomTypes.AddRangeAsync(predefinedRooms);
        await dataContext.SaveChangesAsync();
    }

    private static async Task AddRooms(DataContext dataContext) 
    {
        var rooms = dataContext.Set<Room>();
        var hotels = dataContext.Set<Hotel>();
        var roomTypes = await dataContext.Set<RoomType>().ToListAsync();

        if (await rooms.AnyAsync()) 
        {
            return;
        }

        foreach (var roomType in roomTypes)
        {
            foreach (var hotel in hotels)
            {
                for (int i = 0; i < 5; i++)
                {
                    dataContext.Set<Room>().Add(new Room
                    {
                        Beds = roomType.Name,
                        IsAvailable = true,
                        RoomType = roomType,
                        HotelId = hotel.Id
                    });
                }
            }
        }
        await dataContext.SaveChangesAsync();
    }
    private static async Task AddReservations(DataContext dataContext)
    {
        var reservations = dataContext.Set<Reservation>();

        if (await reservations.AnyAsync())
        {
            return;
        }

        var random = new Random();
        var rooms = await dataContext.Set<Room>()
            .Include(r => r.Hotel)
            .ToListAsync();

        for (int i = 0; i < 3; i++)
        {
            var room = rooms[random.Next(rooms.Count)];
            var checkIn = DateTime.Today.AddDays(random.Next(1, 10));
            var checkOut = checkIn.AddDays(random.Next(1, 10));

            var reservation = new Reservation
            {
                CheckIn = checkIn,
                CheckOut = checkOut,
                ReservationNumber = random.Next(1000, 9999),
                Room = room, 
                RoomId = room.Id, 
                HotelName = room.Hotel?.Name 
            };

            reservations.Add(reservation);
        }
        await dataContext.SaveChangesAsync();
    }

}
