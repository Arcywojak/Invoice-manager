import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { InvoiceHandlerTabIndex } from '../../enums/invoice-handler-tab-index';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-handler',
  templateUrl: './invoice-handler.component.html',
  styleUrls: ['./invoice-handler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceHandlerComponent {

  @Input() selectedInvoice: Invoice | null = null;
  @Input() selectedIndex: InvoiceHandlerTabIndex = InvoiceHandlerTabIndex.CREATE;
  @Output() selectedIndexRefresher = new EventEmitter<InvoiceHandlerTabIndex>()

  constructor() { }

  onTabChanged(change: MatTabChangeEvent) {
    if(change.index !== this.selectedIndex) {
      this.selectedIndexRefresher.emit(change.index);
    }
  }

}
