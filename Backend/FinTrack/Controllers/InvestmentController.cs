using FinTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers.Controllers;
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class InvestmentController(DBcontext Investmentdb) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InvestmentModel>>> GetAllInvestments()
    {
        try
        {
            var Investment = await Investmentdb.Investments.ToListAsync();
            return Ok(Investment);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while retrieving Investments.", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<InvestmentModel>> GetInvestment(Guid id)
    {
        try
        {
            var Investment = await Investmentdb.Investments.FindAsync(id);
            if (Investment == null) return NotFound(new { message = "Investment record not found." });

            return Ok(Investment);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the Investment.", error = ex.Message });
        }
    }

    [HttpGet()]
    [Route("byuser/{UserId}")]
    public async Task<ActionResult<InvestmentModel>> GetInvestmentByUserId(Guid UserId)
    {
        try
        {
            var investment = await Investmentdb.Investments.Where(id => id.UserId == UserId).ToListAsync();
            if (investment == null) return NotFound(new { message = "Investment record not found." });

            return Ok(investment);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the investment by UserId.", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<InvestmentModel>> PostDebt(InvestmentModel addInvestment)
    {
        try
        {
            if (addInvestment == null)
                return BadRequest(new { message = "Invalid Debt data provided." });

            Investmentdb.Investments.Add(addInvestment);
            await Investmentdb.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInvestment), new { id = addInvestment.InvestmentId }, addInvestment);
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while adding Investment.", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutInvestment(Guid id, InvestmentModel updateInvestment)
    {
        try
        {
            updateInvestment.InvestmentId = id;
            var existingInvestment = await Investmentdb.Investments.FindAsync(id);
            if (existingInvestment == null)
                return NotFound(new { message = "Investment record not found." });

            // Preserve CreatedAt from the existing record
            updateInvestment.CreatedAt = existingInvestment.CreatedAt;

            // Update only necessary fields (avoid full entity replacement)
            existingInvestment.Type = updateInvestment.Type;
            existingInvestment.Amount = updateInvestment.Amount;
            existingInvestment.DateInvested = updateInvestment.DateInvested;
            existingInvestment.UserId = updateInvestment.UserId;

            await Investmentdb.SaveChangesAsync();

            return Ok(new { message = "Investment updated successfully." });
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while updating Investment.", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInvestment(Guid id)
    {
        try
        {
            var Investment = await Investmentdb.Investments.FindAsync(id);
            if (Investment == null) return NotFound(new { message = "Investment record not found." });

            Investmentdb.Investments.Remove(Investment);
            await Investmentdb.SaveChangesAsync();

            return Ok(new { message = "Investment record deleted successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while deleting Investment.", error = ex.Message });
        }
    }
}