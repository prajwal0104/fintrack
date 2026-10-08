using FinTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers.Controllers;
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class SavingsController(DBcontext Savingsdb) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SavingsModel>>> GetAllSavings()
    {
        try
        {
            var Saving = await Savingsdb.Savings.ToListAsync();
            return Ok(Saving);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while retrieving Savings.", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SavingsModel>> GetSaving(Guid id)
    {
        try
        {
            var Saving = await Savingsdb.Savings.FindAsync(id);
            if (Saving == null) return NotFound(new { message = "Savings record not found." });

            return Ok(Saving);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the Saving.", error = ex.Message });
        }
    }

    [HttpGet()]
    [Route("byuser/{UserId}")]
    public async Task<ActionResult<SavingsModel>> GetSavingsByUserId(Guid UserId)
    {
        try
        {
            var saving = await Savingsdb.Savings.Where(id => id.UserId == UserId).ToListAsync();
            if (saving == null) return NotFound(new { message = "Savings record not found." });

            return Ok(saving);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the saving by UserId.", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<SavingsModel>> PostSaving(SavingsModel addSaving)
    {
        try
        {
            if (addSaving == null)
                return BadRequest(new { message = "Invalid Saving data provided." });

            Savingsdb.Savings.Add(addSaving);
            await Savingsdb.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSaving), new { id = addSaving.SavingId }, addSaving);
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while adding Saving.", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutSaving(Guid id, SavingsModel updateSaving)
    {
        try
        {
            updateSaving.SavingId = id;
            var existingSaving = await Savingsdb.Savings.FindAsync(id);
            if (existingSaving == null)
                return NotFound(new { message = "Saving record not found." });

            // Preserve CreatedAt from the existing record
            updateSaving.CreatedAt = existingSaving.CreatedAt;

            // Update only necessary fields (avoid full entity replacement)
            existingSaving.GoalName = updateSaving.GoalName;
            existingSaving.TargetAmount = updateSaving.TargetAmount;
            existingSaving.CurrentAmount = updateSaving.CurrentAmount;
            existingSaving.UserId = updateSaving.UserId;

            await Savingsdb.SaveChangesAsync();

            return Ok(new { message = "Saving updated successfully." });
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while updating Saving.", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSaving(Guid id)
    {
        try
        {
            var Saving = await Savingsdb.Savings.FindAsync(id);
            if (Saving == null) return NotFound(new { message = "Saving record not found." });

            Savingsdb.Savings.Remove(Saving);
            await Savingsdb.SaveChangesAsync();

            return Ok(new { message = "Saving record deleted successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while deleting Saving.", error = ex.Message });
        }
    }
}