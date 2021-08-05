import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActiveInvoiceData } from '../../models/active-invoice-data.model';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceListComponent {

  @Input() invoices: Invoice[] = [];

  @Output() activeInvoiceEmitter = new EventEmitter<ActiveInvoiceData>();

  activeInvoiceId = "";

  constructor() { }

  sendActiveInvoiceToParent(data: ActiveInvoiceData) {
    this.activeInvoiceId = data.invoice.id;
    this.activeInvoiceEmitter.emit(data);
  }

}
