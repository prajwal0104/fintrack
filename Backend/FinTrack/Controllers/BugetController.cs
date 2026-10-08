using FinTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class BudgetController(DBcontext Budgetdb) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BudgetModel>>> GetAllBudgets()
    {
        try
        {
            var budgets = await Budgetdb.Budgets.ToListAsync();
            return Ok(budgets);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while retrieving budgets.", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BudgetModel>> GetBudget(Guid id)
    {
        try
        {
            var budget = await Budgetdb.Budgets.FindAsync(id);
            if (budget == null) return NotFound(new { message = "Budget record not found." });

            return Ok(budget);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the budget.", error = ex.Message });
        }
    }

    [HttpGet()]
    [Route("byuser/{UserId}")]
    public async Task<ActionResult<BudgetModel>> GetBudgetByUserId(Guid UserId)
    {
        try
        {
            var budget = await Budgetdb.Budgets.Where(id => id.UserId == UserId).ToListAsync();
            if (budget == null) return NotFound(new { message = "Budget record not found." });

            return Ok(budget);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the budget by UserId.", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<BudgetModel>> PostBudget(BudgetModel addBudget)
    {
        try
        {
            if (addBudget == null)
                return BadRequest(new { message = "Invalid budget data provided." });

            addBudget.BudgetId = Guid.NewGuid();

            Budgetdb.Budgets.Add(addBudget);
            await Budgetdb.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBudget), new { id = addBudget.BudgetId }, addBudget);
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while adding budget.", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutBudget(Guid id, BudgetModel updateBudget)
    {
        try
        {
            if (id != updateBudget.BudgetId)
                return BadRequest(new { message = "Mismatched budget ID in request." });

            var existingBudget = await Budgetdb.Budgets.FindAsync(id);
            if (existingBudget == null)
                return NotFound(new { message = "Budget record not found." });

            // Preserve CreatedAt from the existing record
            updateBudget.CreatedAt = existingBudget.CreatedAt;

            // Update only necessary fields (avoid full entity replacement)
            existingBudget.MonthYear = updateBudget.MonthYear;
            existingBudget.Category = updateBudget.Category;
            existingBudget.AllocatedAmount = updateBudget.AllocatedAmount;
            existingBudget.UserId = updateBudget.UserId; // Ensure valid FK reference

            await Budgetdb.SaveChangesAsync();

            return Ok(new { message = "Budget updated successfully." });
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while updating budget.", error = ex.Message });
        }
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBudget(Guid id)
    {
        try
        {
            var budget = await Budgetdb.Budgets.FindAsync(id);
            if (budget == null) return NotFound(new { message = "Budget record not found." });

            Budgetdb.Budgets.Remove(budget);
            await Budgetdb.SaveChangesAsync();

            return Ok(new { message = "Budget record deleted successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while deleting budget.", error = ex.Message });
        }
    }
}