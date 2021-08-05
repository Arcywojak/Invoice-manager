import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { InvoicePosition } from 'src/app/features/invoice-manager/models/invoice-position.model';

@Component({
  selector: 'app-invoice-position-table',
  templateUrl: './invoice-position-table.component.html',
  styleUrls: ['./invoice-position-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicePositionTableComponent implements OnInit {

  @Input() positions: InvoicePosition[] = [];

  displayedColumns: string[] = ["description", "netValue", "vatTax", "grossValue"];

  constructor() { }

  ngOnInit(): void {
  }

}
