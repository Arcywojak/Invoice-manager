import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Invoice } from 'src/app/features/invoice-manager/models/invoice.model';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceViewComponent {

  @Input() invoice: Invoice | null = null;

  constructor() { }
}
