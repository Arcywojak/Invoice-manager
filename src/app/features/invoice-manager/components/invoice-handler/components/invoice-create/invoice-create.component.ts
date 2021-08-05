import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceCreateComponent {

  constructor() { }

}
