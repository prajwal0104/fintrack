export interface User {
    userId: string;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
}

export interface LoginDbSchema {
    email: string;
    password: string;
}

export interface DebtDbSchema {
    debtId: string;
    userId: string;
    lender: string;
    amountOwed: number;
    interestRate: number;
    dueDate: string; // ISO format (YYYY-MM-DD)
    createdAt: Date;
}

export interface InvestmentDbSchema {
    investmentId: string;
    userId: string;
    type: string;
    amount: number;
    dateInvested: string; // ISO format (YYYY-MM-DD)
    createdAt: Date;
}

export interface SavingsDbSchema {
    savingId: string;
    userId: string;
    goalName: string;
    targetAmount: number;
    currentAmount: number;
    createdAt: Date;
}


export interface BudgetDbSchema {
    budgetId: string;
    userId: string;
    monthYear: string;
    category: string;
    allocatedAmount: number;
    createdAt: Date;
}



export interface ExpenseDbSchema {
    expenseId: string;
    userId: string;
    category: string;
    amount: number;
    dateSpent: string; // ISO format (YYYY-MM-DD)
    isFixed: boolean;
    createdAt: Date;
}

export interface IncomeDbSchema {
    incomeId: string;
    userId: string;
    source: string;
    amount: number;
    createdAt: Date;
}

export interface TransactionDbSchema {
    transactionId: string;
    userId: string;
    category: string;
    amount: number;
    action: string;
    createdAt: Date;
}
export type lspayload = {
    userid: string,
    username: string,
    jwttoken: string
}
export function GetUserDetails() {
    const data: lspayload = JSON.parse(localStorage.getItem("JwtToken") || "");

    return { jwt_token: data.jwttoken, user_id: data.userid, user_name: data.username }

}

