import { Pipe, PipeTransform } from '@angular/core';
import { PositionPipeValueType } from '../../enums/position-pipe-value-type';
import { InvoicePosition } from '../../models/invoice-position.model';

@Pipe({
  name: 'positionValue'
})
export class PositionValuePipe implements PipeTransform {

  transform(value: InvoicePosition, valueType: PositionPipeValueType): string {
    const {netValue, vatTax} = value;
    
    if(valueType === PositionPipeValueType.NET) {
      return netValue.toFixed(2);
    }

    const multiplyBy = Math.round( (vatTax/100 + 1)*100) / 100

    return (netValue*multiplyBy).toFixed(2);
  }

}
