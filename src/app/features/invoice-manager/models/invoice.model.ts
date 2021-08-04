import { InvoicePosition } from "./invoice-position.model";

export interface Invoice {
    id: string,
    number: string,
    remark?: string,
    sellerFullName: string,
    buyerFullName: string,
    positions: InvoicePosition[],
    createdAt: number
}