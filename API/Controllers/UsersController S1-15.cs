// using System.Collections.Generic;
// using System.Linq;
// using API.Data;
// using API.Entities;
// //Now MVC stands for the old fashioned model view controller and our API controller is a type of controller.
// //MVC模式（Model–view–controller）是软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）。
// //view来自客户端，这个练习中使用了Angular
// using Microsoft.AspNetCore.Mvc;

// namespace API.Controllers
// {
//     //this signifies that this particular class is of type API controller.
//     //这表示这个特定的类属于API控制器类型。
//     [ApiController]
//     //We also need a root for our API controllers.      // 我们还需要API控制器的根。
//     [Route("api/[controller]")]
//     //a controller needs to derive from a controller base.   
//     public class UsersController : ControllerBase
//     {
//         private readonly DataContext _context;
//         public UsersController(DataContext context)
//         {
//             _context = context;
//         }
//         [HttpGet]
//         // public ActionResult<List<AppUser>>GetUsers()
//         // List 也可以，但这个例子中我们只需要简单的功能，List offers too many features
//         public ActionResult<IEnumerable<AppUser>> GetUsers()
//         {
//             // var users = _context.Users.ToList();
//             // return users;
//             //简写如下：
//             return _context.Users.ToList();
//         }
//         //   api/users/3    --例子  ，  稍后我们会在postman 中看见，新版本有自带swagger
//         [HttpGet("{id}")]
//         public ActionResult<AppUser> GetUser(int id)
//         {
//             return _context.Users.Find(id);
//         }

//     }
// }