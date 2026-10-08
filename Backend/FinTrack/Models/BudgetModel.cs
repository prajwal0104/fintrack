using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinTrack.Model
{
    public class BudgetModel
    {
        [Key] public Guid BudgetId { get; set; }
        public Guid UserId { get; set; }
        public string MonthYear { get; set; }
        public string Category { get; set; }
        [Column(TypeName = "decimal(18,2)")] public decimal AllocatedAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        [JsonIgnore] public UserModel? User { get; set; }
    }
}