import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InvoiceHandlerTabIndex } from '../../enums/invoice-handler-tab-index';
import { ActiveInvoiceData } from '../../models/active-invoice-data.model';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  @Input() invoices!: Invoice[];

  @Output() activeInvoiceEmitter = new EventEmitter<ActiveInvoiceData>();

  constructor() { }

  ngOnInit(): void {
  }

  sendActiveInvoiceToParent(data: ActiveInvoiceData) {
    this.activeInvoiceEmitter.emit(data);
  }

}
