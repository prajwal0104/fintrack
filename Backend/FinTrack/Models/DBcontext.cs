using Microsoft.EntityFrameworkCore;

namespace FinTrack.Model
{
    public class DBcontext : DbContext
    {
        public DBcontext(DbContextOptions<DBcontext> options) : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<IncomeModel> Incomes { get; set; }
        public DbSet<ExpenseModel> Expenses { get; set; }
        public DbSet<DebtModel> Debts { get; set; }
        public DbSet<TransactionsModel> Transactions { get; set; }
        public DbSet<BudgetModel> Budgets { get; set; }
        public DbSet<InvestmentModel> Investments { get; set; }
        public DbSet<SavingsModel> Savings { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>()
                .Property(u => u.UserId)
                .HasDefaultValueSql("NEWSEQUENTIALID()");
            modelBuilder.Entity<UserModel>()
                .Property(u => u.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<UserModel>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<IncomeModel>()
                .Property(i => i.IncomeId)
                .HasDefaultValueSql("NEWSEQUENTIALID()");
            modelBuilder.Entity<IncomeModel>()
                .Property(i => i.CreatedAt)
                .HasDefaultValueSql("GETDATE()");


            modelBuilder.Entity<ExpenseModel>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("GETDATE()");
            modelBuilder.Entity<ExpenseModel>()
                .Property(e => e.ExpenseId)
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            modelBuilder.Entity<DebtModel>()
                .Property(d => d.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<DebtModel>()
                .Property(d => d.DebtId)
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            modelBuilder.Entity<TransactionsModel>()
                .Property(t => t.CreatedAt)
                .HasDefaultValueSql("GETDATE()");
            modelBuilder.Entity<TransactionsModel>()
                .Property(t => t.TransactionId)
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            modelBuilder.Entity<BudgetModel>()
                .Property(b => b.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<BudgetModel>()
                .Property(b => b.BudgetId)
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            modelBuilder.Entity<InvestmentModel>()
                .Property(i => i.CreatedAt)
                .HasDefaultValueSql("GETDATE()");
            modelBuilder.Entity<InvestmentModel>()
                .Property(i => i.InvestmentId)
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            modelBuilder.Entity<SavingsModel>()
                .Property(s => s.CreatedAt)
                .HasDefaultValueSql("GETDATE()");
            modelBuilder.Entity<SavingsModel>()
                .Property(s => s.SavingId)
                .HasDefaultValueSql("NEWSEQUENTIALID()");
        }
    }
}