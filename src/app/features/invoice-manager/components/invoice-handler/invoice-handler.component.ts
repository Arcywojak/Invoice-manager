import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-handler',
  templateUrl: './invoice-handler.component.html',
  styleUrls: ['./invoice-handler.component.scss']
})
export class InvoiceHandlerComponent implements OnInit {

  @Input() selectedInvoice: Invoice | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
