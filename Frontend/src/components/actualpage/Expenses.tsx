
import { BaseURL, Expense } from "../utils/DBLinks"
import { ExpenseDbSchema, GetUserDetails } from "../utils/DbSchema"
import DataManager from "./DataManager"
export default function ExpensesPage() {
  return (
    <DataManager<ExpenseDbSchema>
      title="Expense"
      baseURL={BaseURL}
      endpoints={{
        getByUserId: Expense.GetByUserId,
        post: Expense.Post,
        put: Expense.Put,
        delete: Expense.Delete,
      }}
      getUserId={GetUserDetails().user_id}
      fields={[
        {
          name: "category",
          label: "Category",
          type: "text",
          required: true,
        },
        {
          name: "amount",
          label: "Amount",
          type: "number",
          required: true,
          min: 0,
        },
        {
          name: "dateSpent",
          label: "Date Spent",
          type: "date",
          required: true,
        },
        {
          name: "isFixed",
          label: "Is Fixed Expense",
          type: "boolean",
        },
      ]}
      idField="expenseId"
      displayFields={[
        {
          name: "category",
          label: "Category",
        },
        {
          name: "amount",
          label: "Amount",
          format: (value) => `₹ ${value}`,
        },
        {
          name: "dateSpent",
          label: "Date Spent",
        },
        {
          name: "isFixed",
          label: "Fixed Expense",
          format: (value) => (value ? "Yes" : "No"),
        },
      ]}
      defaultValues={{
        userId: "",
        category: "",
        amount: 0,
        dateSpent: "",
        isFixed: false,
      }}
    />
  )
}

