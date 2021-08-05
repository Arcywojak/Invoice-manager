import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { InvoiceHandlerTabIndex } from '../../../enums/invoice-handler-tab-index';
import { ActiveInvoiceData } from '../../../models/active-invoice-data.model';
import { Invoice } from '../../../models/invoice.model';

@Component({
  selector: 'app-single-invoice',
  templateUrl: './single-invoice.component.html',
  styleUrls: ['./single-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleInvoiceComponent {
  

  @Input() invoice!: Invoice;
  @Input() activeId = "";
  @Output() currentInvoiceData = new EventEmitter<ActiveInvoiceData>();

  constructor() { }

  emitActiveInvoiceData(index: InvoiceHandlerTabIndex) {
    this.currentInvoiceData.emit({
      tabIndex: index,
      invoice: this.invoice
    });
  }

}
