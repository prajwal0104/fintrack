using FinTrack.Model;
using FinTrack.Services;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController(DBcontext Logindb, JwtService JWT) : ControllerBase
{
    [HttpPost]
    public ActionResult Login([FromBody] LoginModel logininfo)
    {
        var user = Logindb.Users.FirstOrDefault(u =>
            u.Email == logininfo.Email && u.PasswordHash == logininfo.Password);

        if (user == null)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        var token = JWT.GenerateToken(username: user.Name,
            userid: user.UserId.ToString());


        return Ok(new { message = "Login successful!", JwtToken = token.ToString() });
    }
}