import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-filter',
  templateUrl: './invoice-filter.component.html',
  styleUrls: ['./invoice-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceFilterComponent implements OnInit {

  @Input() data: Invoice[] = [];
  @Output() filteredDataEmitter = new EventEmitter<Invoice[]>()

  filterByProps = ["number", "buyerFullName", "sellerFullName"]

  filterFormControl = new FormControl("");

  constructor() { }

  ngOnInit() {
    this.filterFormControl.valueChanges.subscribe(() => {
      this.filter();
    })
  }

  filter() {
    const inputValue = this.filterFormControl.value.toLowerCase();

    const filteredData = this.data.filter((element: Invoice) => {
      //checking one-level-nested-props
      const doesAnyPropContainsInputValue = this.doesAnyPropContainsInputValue(element, inputValue)

      //checking nested descriptions
      const doesAnyDescriptionContainsInputValue = this.doesAnyDescriptionContainsInputValue(element, inputValue);
      
      return doesAnyPropContainsInputValue || doesAnyDescriptionContainsInputValue;
    })

    this.filteredDataEmitter.emit(filteredData);
  }

  private doesAnyPropContainsInputValue(invoice: Invoice, inputValue: string) {
      return this.filterByProps.some(keyName => {
        const invoicePropValue = invoice[keyName as keyof Invoice]

        const isStringOrNumber = this.isStringOrNumber(invoicePropValue);
        if(!isStringOrNumber) {
          return false;
        }

        return invoicePropValue?.toString().toLocaleLowerCase().includes(inputValue);
      })
  }

  private doesAnyDescriptionContainsInputValue(invoice: Invoice, inputValue: string) {
    return invoice.positions.some(position => {
      const positionDescValue = position.description;

      const isStringOrNumber = this.isStringOrNumber(positionDescValue);
      if(!isStringOrNumber) {
        return false;
      }

      return positionDescValue.toString().toLocaleLowerCase().includes(inputValue);
    })
  }

  private isStringOrNumber(val: any): boolean {
    const isStringOrNumber = typeof(val) === "string" 
    || 
    !isNaN(val);

    if(!isStringOrNumber) { 
      return false;
    }

    return true;
  }

}
