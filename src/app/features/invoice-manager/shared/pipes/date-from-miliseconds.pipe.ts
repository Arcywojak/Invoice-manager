import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFromMiliseconds'
})
export class DateFromMilisecondsPipe implements PipeTransform {

  transform(value: number): string {
    const date = new Date(value);

    return date.toLocaleDateString();
  }

}
