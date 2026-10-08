using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinTrack.Model
{
    public class ExpenseModel
    {
        [Key]
        public Guid ExpenseId { get; set; }
        public Guid UserId { get; set; }
        public string Category { get; set; }
        [Column(TypeName ="decimal(18,2)")]
        public decimal Amount { get; set; }
        public DateOnly DateSpent { get; set; }
        public bool? IsFixed { get; set; }
        public DateTime CreatedAt { get; set; }
        [JsonIgnore]
        public UserModel? User { get; set; }
    }
}
