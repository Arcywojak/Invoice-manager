import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InvoiceHandlerTabIndex } from './enums/invoice-handler-tab-index.enum';
import { InvoiceStore } from './invoice.store';
import { ActiveInvoiceData } from './models/active-invoice-data.model';
import { Invoice } from './models/invoice.model';

@Component({
  selector: 'app-invoice-manager',
  templateUrl: './invoice-manager.component.html',
  styleUrls: ['./invoice-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceManagerComponent implements OnInit {
  
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  activeInvoice: Invoice | null = null;
  currentIndex: InvoiceHandlerTabIndex = InvoiceHandlerTabIndex.CREATE;

  constructor(private invoiceStore: InvoiceStore, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.invoiceStore.refreshInvoices();

    this.invoiceStore.$invoices.subscribe(data => {
      if(this.activeInvoice && this.wasActiveInvoiceDeleted(data)) {
        this.activeInvoice = null;
      }
      this.invoices = data;
      this.filteredInvoices = data;
      this.changeDetection.detectChanges();
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
