using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinTrack.Model
{
    public class DebtModel
    {
        [Key]
        public Guid DebtId { get; set; }
        public Guid UserId { get; set; }
        public string Lender { get; set; }
        [Column(TypeName ="decimal(18,2)")]
        public decimal AmountOwed { get; set; }
        public float InterestRate { get; set; }
        public DateOnly DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        [JsonIgnore]
        public UserModel? User { get; set; }
    }
}
