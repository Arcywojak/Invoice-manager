import { Component, OnInit } from '@angular/core';
import { InvoiceHandlerTabIndex } from './enums/invoice-handler-tab-index';
import { InvoiceStore } from './invoice.store';
import { ActiveInvoiceData } from './models/active-invoice-data.model';
import { Invoice } from './models/invoice.model';
import { InvoiceService } from './services/invoice.service';

@Component({
  selector: 'app-invoice-manager',
  templateUrl: './invoice-manager.component.html',
  styleUrls: ['./invoice-manager.component.scss']
})
export class InvoiceManagerComponent implements OnInit {
  
  invoices: Invoice[] = [];
  activeInvoice: Invoice | null = null;
  currentIndex: InvoiceHandlerTabIndex = InvoiceHandlerTabIndex.CREATE;

  constructor(private invoiceStore: InvoiceStore, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceStore.refreshInvoices();

    this.invoiceStore.$invoices.subscribe(data => {
      console.log(data)
      this.invoices = data;
    })
  }

  setActiveInvoice(data: ActiveInvoiceData) {
    this.activeInvoice = data.invoice;
    this.currentIndex = data.tabIndex;
  }

}
