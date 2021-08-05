import { Component, OnInit } from '@angular/core';
import { InvoiceHandlerTabIndex } from './enums/invoice-handler-tab-index';
import { InvoiceStore } from './invoice.store';
import { ActiveInvoiceData } from './models/active-invoice-data.model';
import { Invoice } from './models/invoice.model';

@Component({
  selector: 'app-invoice-manager',
  templateUrl: './invoice-manager.component.html',
  styleUrls: ['./invoice-manager.component.scss']
})
export class InvoiceManagerComponent implements OnInit {
  
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  activeInvoice: Invoice | null = null;
  currentIndex: InvoiceHandlerTabIndex = InvoiceHandlerTabIndex.CREATE;

  constructor(private invoiceStore: InvoiceStore) { }

  ngOnInit(): void {
    this.invoiceStore.refreshInvoices();

    this.invoiceStore.$invoices.subscribe(data => {
      if(this.activeInvoice && this.wasActiveInvoiceDeleted(data)) {
        console.log("NEW")
        this.activeInvoice = null;
      }

      this.invoices = data;
      this.filteredInvoices = data;
    })
  }

  setActiveInvoice(data: ActiveInvoiceData) {
    this.activeInvoice = data.invoice;
    this.currentIndex = data.tabIndex;
  }

  updateSelectedIndex(index: InvoiceHandlerTabIndex) {
    this.currentIndex = index;
  }

  setFilteredInvoices(invoices: Invoice[]) {
    this.filteredInvoices = invoices;
  }

  wasActiveInvoiceDeleted(invoices: Invoice[]) {
    const currentInvoiceId = this.activeInvoice?.id;

    const isInvoicePresent = invoices.some(el => el.id === currentInvoiceId);

    return !isInvoicePresent;
  }
 
}
