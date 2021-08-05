import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
