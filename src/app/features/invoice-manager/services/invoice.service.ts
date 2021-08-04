import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/shared/localStorage.service";
import { INVOICES_IN_LOCAL_STORAGE_NAME, INVOICE_NUMBER_IN_LOCAL_STORAGE_NAME } from "../constants/invoice-local-storage-names.constant";
import { InvoiceValidationResult } from "../models/invoice-validation-result";
import { Invoice } from "../models/invoice.model";
import { getRandomId } from "../utils/generate-random-id";

@Injectable({
    providedIn: "root",
})
export class InvoiceService {

    constructor(
        private localStorageServiceForInvoices: LocalStorageService<Invoice[]>,
        private localStorageServiceForNumber: LocalStorageService<number>,
        ) { }

    getInvoices(): Invoice[] {
        return this.localStorageServiceForInvoices.getData(INVOICES_IN_LOCAL_STORAGE_NAME) || [];
    }

    getInvoice(id: string) {

    }

    createInvoice(invoice: Invoice) {

        invoice.id = getRandomId();
        invoice.createdAt = Date.now();
        const invoices = this.getInvoices();
        const newInvoices = [...invoices, invoice];
        this.localStorageServiceForInvoices.setData(INVOICES_IN_LOCAL_STORAGE_NAME, newInvoices);
        this.setNextInvoiceNumber();
    }

    updateInvoice(invoice: Invoice) {
        console.log("I update")
        const invoices: Invoice[] = this.getInvoices();
        const newInvoices = invoices.map(el => {
            //we want to find the older version of the invoice and replace it
            if(el.id === invoice.id) {
                return invoice;
            }
            return el;
        })
        return;
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

    validate(invoice: Invoice): InvoiceValidationResult {
        const isAnyPosition = invoice.positions.length > 0;
        if(!isAnyPosition) {
            return {
                isError: true,
                message: "Add at least one position to the invoice"
            }
        }
        const invoices = this.getInvoices();
        const isAnyWithTheSameNumber = invoices.some(el => {
            //we also check id because we want to find two different invoices with the same number
            if(el.number === invoice.number && el.id !== invoice.id) {
                console.log(el, invoice)
            }
            return (el.number === invoice.number && el.id !== invoice.id);
        });

        if(isAnyWithTheSameNumber) {
            return {
                isError: true,
                message: `Invoice with number ${invoice.number} already exists`
            }
        }

        return {
            isError: false,
            message: ""
        }
    }
}