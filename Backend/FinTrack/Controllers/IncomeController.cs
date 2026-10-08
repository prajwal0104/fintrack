using FinTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers;
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class IncomeController(DBcontext Incomedb) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<IncomeModel>>> GetAllBudgets()
    {
        try
        {
            var incomes = await Incomedb.Incomes.ToListAsync();
            return Ok(incomes);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while retrieving income records.", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IncomeModel>> GetIncome(Guid id)
    {
        try
        {
            var income = await Incomedb.Incomes.FindAsync(id);
            if (income == null) return NotFound(new { message = "Income record not found." });

            return Ok(income);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the income record.", error = ex.Message });
        }
    }

    [HttpGet()]
    [Route("byuser/{UserId}")]
    public async Task<ActionResult<IncomeModel>> GetIncomeByUserId(Guid UserId)
    {
        try
        {
            var income = await Incomedb.Incomes.Where(id => id.UserId == UserId).ToListAsync();
            if (income == null) return NotFound(new { message = "Income record not found." });

            return Ok(income);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the income by UserId.", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<IncomeModel>> PostUser(IncomeModel addIncome)
    {
        try
        {
            if (addIncome == null)
                return BadRequest(new { message = "Invalid income data provided." });

            Incomedb.Incomes.Add(addIncome);
            await Incomedb.SaveChangesAsync();

            return CreatedAtAction(nameof(GetIncome), new { id = addIncome.IncomeId }, addIncome);
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while adding income.", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutIncome(Guid id, IncomeModel updateIncome)
    {
        try
        {
            var existingIncome = await Incomedb.Incomes.FindAsync(id);
            if (existingIncome == null)
                return NotFound(new { message = "Income record not found." });

            // Preserve CreatedAt from the existing record
            updateIncome.CreatedAt = existingIncome.CreatedAt;

            // Update only necessary fields (avoid full entity replacement)
            existingIncome.Source = updateIncome.Source;
            existingIncome.Amount = updateIncome.Amount;
            existingIncome.UserId = updateIncome.UserId;

            await Incomedb.SaveChangesAsync();

            return Ok(new { message = "Income updated successfully." });
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while updating income.", error = ex.Message });
        }
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteIncome(Guid id)
    {
        try
        {
            var income = await Incomedb.Incomes.FindAsync(id);
            if (income == null) return NotFound(new { message = "Income record not found." });

            Incomedb.Incomes.Remove(income);
            await Incomedb.SaveChangesAsync();

            return Ok(new { message = "Income record deleted successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while deleting income.", error = ex.Message });
        }
    }
}