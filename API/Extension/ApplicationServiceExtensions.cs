using API.Interface;
using API.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Extension
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){

            services.AddScoped<ITokenService, TokenService>();

            services.AddDbContext<DataContext>(option =>
            {
                option.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}