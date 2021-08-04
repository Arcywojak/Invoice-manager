import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { InvoiceManagerModule } from "./invoice-manager.module";
import { Invoice } from "./models/invoice.model";
import { InvoiceService } from "./services/invoice.service";

@Injectable({
    providedIn: InvoiceManagerModule,
})

export class InvoiceStore {
    private readonly _invoices = new BehaviorSubject<Invoice[]>(this.invoiceService.getInvoices());

    readonly $invoices = this._invoices.asObservable();

    constructor(private invoiceService: InvoiceService) {}

    getInvoices() {
        return this._invoices.getValue();
    }

    refreshInvoices() {
        const invoices = this.invoiceService.getInvoices();
        this._invoices.next(invoices);
    }
}