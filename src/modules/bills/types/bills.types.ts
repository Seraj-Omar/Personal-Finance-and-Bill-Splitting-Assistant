// bills.types.ts

// Define the different types of bills
export enum BillType {
    Fixed = 'Fixed',
    Variable = 'Variable',
    Recurring = 'Recurring',
}

// Define the structure of a bill payload
export interface BillPayload {
    id: string;
    type: BillType;
    amount: number;
    dueDate: string;
    description?: string;
}