import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Invoice } from 'src/app/features/invoice-manager/models/invoice.model';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceEditComponent {

  @Input() invoice: Invoice | null = null;

  constructor() { }

}
