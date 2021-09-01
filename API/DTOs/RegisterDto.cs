using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        // [RegularExpression]
        // [EmailAddress]
        // [Phone]
        public string Password { get; set; }
    }
}