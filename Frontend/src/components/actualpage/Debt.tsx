import { BaseURL, Debt } from "../utils/DBLinks";
import { DebtDbSchema, GetUserDetails } from "../utils/DbSchema";
import normaldatetime from "../utils/Normaldatetime";
import DataManager from "./DataManager";

export default function DebtsPage() {
  return (
    <DataManager<DebtDbSchema>
      title="Debt"
      baseURL={BaseURL}
      endpoints={{
        getByUserId: Debt.GetByUserId,
        post: Debt.Post,
        put: Debt.Put,
        delete: Debt.Delete,
      }}
      getUserId={GetUserDetails().user_id}
      fields={[
        {
          name: "lender",
          label: "Lender",
          type: "text",
          required: true,
        },
        {
          name: "amountOwed",
          label: "Amount Owed",
          type: "number",
          required: true,
          min: 0,
        },
        {
          name: "interestRate",
          label: "Interest Rate (%)",
          type: "number",
          required: true,
          min: 0,
        },
        {
          name: "dueDate",
          label: "Due Date",
          type: "date",
          required: true,
        },
      ]}
      idField="debtId"
      displayFields={[
        {
          name: "lender",
          label: "Lender",
        },
        {
          name: "amountOwed",
          label: "Amount Owed",
          format: (value) => `₹ ${value}`,
        },
        {
          name: "interestRate",
          label: "Interest Rate",
          format: (value) => `${value} %`,
        },
        {
          name: "dueDate",
          label: "Due Date",
        },
      ]}
      formatDate={normaldatetime}
      defaultValues={{
        userId: "",
        lender: "",
        amountOwed: 0,
        interestRate: 0,
        dueDate: "",
      }}
    />
  );
}
