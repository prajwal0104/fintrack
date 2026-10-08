"use client"

import { BaseURL, Investment } from "../utils/DBLinks"
import { GetUserDetails, InvestmentDbSchema } from "../utils/DbSchema"
import DataManager from "./DataManager"

export default function InvestmentsPage() {
  return (
    <DataManager<InvestmentDbSchema>
      title="Investment"
      baseURL={BaseURL}
      endpoints={{
        getByUserId: Investment.GetByUserId,
        post: Investment.Post,
        put: Investment.Put,
        delete: Investment.Delete,
      }}
      getUserId={GetUserDetails().user_id}
      fields={[
        {
          name: "type",
          label: "Investment Type",
          type: "select",
          required: true,
          options: [
            { value: "stocks", label: "Stocks" },
            { value: "bonds", label: "Bonds" },
            { value: "realestate", label: "Real Estate" },
            { value: "crypto", label: "Cryptocurrency" },
            { value: "other", label: "Other" },
          ],
        },
        {
          name: "amount",
          label: "Amount",
          type: "number",
          required: true,
          min: 0,
        },
        {
          name: "dateInvested",
          label: "Date Invested",
          type: "date",
          required: true,
        },
      ]}
      idField="investmentId"
      displayFields={[
        {
          name: "type",
          label: "Type",
          format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
        },
        {
          name: "amount",
          label: "Amount",
          format: (value) => `₹ ${value}`,
        },
        {
          name: "dateInvested",
          label: "Date Invested",
        },
      ]}
      defaultValues={{
        userId: "",
        type: "",
        amount: 0,
        dateInvested: "",
      }}
    />
  )
}

