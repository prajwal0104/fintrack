using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinTrack.Model
{
    public class SavingsModel
    {
        [Key]
        public Guid SavingId { get; set; }
        public Guid UserId { get; set; }
        public string GoalName { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TargetAmount { get; set; }
        [Column(TypeName ="decimal(18,2)")]
        public decimal CurrentAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        [JsonIgnore]
        public UserModel? User { get; set; }
     
    }
}
