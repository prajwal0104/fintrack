using FinTrack.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Controllers.Controllers;
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class TransactionController(DBcontext Transactiondb) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransactionsModel>>> GetAllTransactions()
    {
        try
        {
            var Transaction = await Transactiondb.Transactions.ToListAsync();
            return Ok(Transaction);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while retrieving Transactions.", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TransactionsModel>> GetTransaction(Guid id)
    {
        try
        {
            var Transaction = await Transactiondb.Transactions.FindAsync(id);
            if (Transaction == null) return NotFound(new { message = "Transaction record not found." });

            return Ok(Transaction);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the Transaction.", error = ex.Message });
        }
    }

    [HttpGet()]
    [Route("byuser/{UserId}")]
    public async Task<ActionResult<TransactionsModel>> GetTransactionByUserId(Guid UserId)
    {
        try
        {
            var transaction = await Transactiondb.Transactions.Where(id => id.UserId == UserId).ToListAsync();
            if (transaction == null) return NotFound(new { message = "Transaction record not found." });

            return Ok(transaction);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching the transaction by UserId.", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<TransactionsModel>> PostDebt(TransactionsModel addTransaction)
    {
        try
        {
            if (addTransaction == null)
                return BadRequest(new { message = "Invalid Debt data provided." });

            Transactiondb.Transactions.Add(addTransaction);
            await Transactiondb.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransaction), new { id = addTransaction.TransactionId }, addTransaction);
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Database update failed.", error = dbEx.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while adding Transaction.", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutTransaction(Guid id, TransactionsModel updateTransaction)
    {
        try
        {
            updateTransaction.TransactionId = id;
            var existingTransaction = await Transactiondb.Transactions.FindAsync(id);
            if (existingTransaction == null)
                return NotFound(new { message = "Transaction record not found." });

            // Preserve CreatedAt from the existing record
            updateTransaction.CreatedAt = existingTransaction.CreatedAt;

            // Update only necessary fields (avoid full entity replacement)
            existingTransaction.Action = updateTransaction.Action;
            existingTransaction.Amount = updateTransaction.Amount;
            existingTransaction.Category = updateTransaction.Category;
            existingTransaction.UserId = updateTransaction.UserId;

            await Transactiondb.SaveChangesAsync();

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
                new { message = "An error occurred while updating Debt.", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDept(Guid id)
    {
        try
        {
            var Debt = await Transactiondb.Debts.FindAsync(id);
            if (Debt == null) return NotFound(new { message = "Dept record not found." });

            Transactiondb.Debts.Remove(Debt);
            await Transactiondb.SaveChangesAsync();

            return Ok(new { message = "Dept record deleted successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while deleting Debt.", error = ex.Message });
        }
    }
}