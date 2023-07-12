using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager)
    //     public static async Task SeedUsers(UserManager<AppUser> userManager,
    // RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;
            //if we have user data, return

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
// Console.WriteLine(userData);

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();

                await userManager.CreateAsync(user, "Pa$$w0rd");
                // await userManager.AddToRoleAsync(user, "Member");
            }

        }
    }
}