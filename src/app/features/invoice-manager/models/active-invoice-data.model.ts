import { InvoiceHandlerTabIndex } from "../enums/invoice-handler-tab-index";
import { Invoice } from "./invoice.model";

export interface ActiveInvoiceData {
    tabIndex: InvoiceHandlerTabIndex,
    invoice: Invoice
}