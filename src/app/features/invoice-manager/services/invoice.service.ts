import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/shared/localStorage.service";
import { INVOICES_IN_LOCAL_STORAGE_NAME, INVOICE_NUMBER_IN_LOCAL_STORAGE_NAME } from "../constants/invoice-local-storage-names.constant";
import { InvoiceManagerModule } from "../invoice-manager.module";
import { Invoice } from "../models/invoice.model";
import { getRandomId } from "../utils/generate-random-id";

@Injectable({
    providedIn: InvoiceManagerModule,
})
export class InvoiceService {

    constructor(
        private localStorageServiceForInvoices: LocalStorageService<Invoice[]>,
        private localStorageServiceForNumber: LocalStorageService<number>
        ) { }

    getInvoices(): Invoice[] {
        return this.localStorageServiceForInvoices.getData(INVOICES_IN_LOCAL_STORAGE_NAME) || [];
    }

    getInvoice(id: string) {

    }

    createInvoice(invoice: Invoice) {
        invoice.id = getRandomId();
        const invoices = this.getInvoices();
        const newInvoices = [...invoices, invoice];
        this.localStorageServiceForInvoices.setData(INVOICES_IN_LOCAL_STORAGE_NAME, newInvoices);
    }

    updateInvoice(invoice: Invoice) {
        const invoices: Invoice[] = this.getInvoices();
        const newInvoices = invoices.map(el => {
            //we want to find the older version of the invoice and replace it
            if(el.id === invoice.id) {
                return invoice;
            }
            return el;
        })

        this.localStorageServiceForInvoices.setData(INVOICES_IN_LOCAL_STORAGE_NAME, newInvoices);
    }

    removeInvoice(id: string) {
        const invoices: Invoice[] = this.getInvoices();
        const newInvoices = invoices.filter(el => el.id !== id);
        this.localStorageServiceForInvoices.setData(INVOICES_IN_LOCAL_STORAGE_NAME, newInvoices);
    }

    getNextInvoiceNumber() {
        return this.localStorageServiceForNumber.getData(INVOICE_NUMBER_IN_LOCAL_STORAGE_NAME) || 1;
    }

    setNextInvoiceNumber() {
        const currentNumber = this.getNextInvoiceNumber();
        const nextNumber = currentNumber + 1;
        return this.localStorageServiceForNumber.setData(INVOICE_NUMBER_IN_LOCAL_STORAGE_NAME, nextNumber);
    }
}