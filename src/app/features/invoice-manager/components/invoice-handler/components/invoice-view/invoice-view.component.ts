import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Invoice } from 'src/app/features/invoice-manager/models/invoice.model';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceViewComponent implements OnInit {

  @Input() invoice: Invoice | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
