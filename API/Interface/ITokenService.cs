using API.Entities;

namespace API.Interface
{
    public interface ITokenService
    {

        string CreatToken(AppUser user);
    }
}