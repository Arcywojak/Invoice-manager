import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-filter',
  templateUrl: './invoice-filter.component.html',
  styleUrls: ['./invoice-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
