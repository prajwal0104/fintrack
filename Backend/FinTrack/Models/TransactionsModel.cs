using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinTrack.Model
{
    public class TransactionsModel
    {
        [Key] public Guid TransactionId { get; set; }
        public Guid UserId { get; set; }
        public string Category { get; set; }
        [Column(TypeName = "decimal(18,2)")] public decimal Amount { get; set; }
        public string Action { get; set; }
        public DateTime CreatedAt { get; set; }
        [JsonIgnore] public UserModel? User { get; set; }
    }
}