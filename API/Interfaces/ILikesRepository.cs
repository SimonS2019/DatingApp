using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId);
        Task<AppUser> GetUserWithLikes(int userId);
        // Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId);
        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);
    }
}