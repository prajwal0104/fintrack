"use client";

import { BaseURL, Budget } from "../utils/DBLinks";
import { BudgetDbSchema, GetUserDetails } from "../utils/DbSchema";
import DataManager from "./DataManager";

export default function BudgetsPage() {
  return (
    <DataManager<BudgetDbSchema>
      title="Budget"
      baseURL={BaseURL}
      endpoints={{
        getByUserId: Budget.GetByUserId,
        post: Budget.Post,
        put: Budget.Put,
        delete: Budget.Delete,
      }}
      getUserId={GetUserDetails().user_id}
      fields={[
        {
          name: "monthYear",
          label: "Month/Year",
          type: "text",
          required: true,
        },
        {
          name: "category",
          label: "Category",
          type: "text",
          required: true,
        },
        {
          name: "allocatedAmount",
          label: "Allocated Amount",
          type: "number",
          required: true,
          min: 0,
        },
      ]}
      idField="budgetId"
      displayFields={[
        {
          name: "monthYear",
          label: "Period / Duration",
        },
        {
          name: "category",
          label: "Category",
        },
        {
          name: "allocatedAmount",
          label: "Amount",
          format: (value) => `₹ ${value}`,
        },
      ]}
      defaultValues={{
        userId: "",
        monthYear: "",
        category: "",
        allocatedAmount: 0,
      }}
    />
  );
}
