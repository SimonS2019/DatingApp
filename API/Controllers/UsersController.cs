using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{




    public class UsersController :BaseApiController
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]


        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
         string cookieName = "myCookie22";
    string cookieValue = "myValue";
    
    // Create a new cookie object
    var cookieOptions = new CookieOptions
    {
        HttpOnly = false,
        Secure = true,
        SameSite = SameSiteMode.None,
        Expires = DateTimeOffset.Now.AddDays(1)
    };
    
    // Add the cookie to the response
    HttpContext.Response.Cookies.Append(cookieName, cookieValue, cookieOptions);

    // Return your response
    return Ok("Response with cookie");
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }

    }
}