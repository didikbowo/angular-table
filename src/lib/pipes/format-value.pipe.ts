import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';
import { DatePipe } from '@angular/common'

@Pipe({
  name: 'formatValue'
})
export class FormatValuePipe implements PipeTransform {

  // tslint:disable-next-line: max-line-length
  transform(value: any, type?: 'string' | 'number' | 'decimal' | 'date' | 'year' | 'datetime' | 'currency' | 'incurrency' | 'phone' | 'age' | 'percentage', option?: any): any {
    if (isEmpty(value)) {
      return null;
    }
    else if (type === 'string') {
      return value;
    }
    else if (type === 'number') {
      return formatNumber(value, 'id-ID', '1.0-0');
    }
    else if (type === 'decimal') {
      const num = strToNumber(value);
      return formatNumber(value, 'id-ID', option);
    }
    else if (type === 'date') {
      const datePipe = new DatePipe('id-ID');
      return datePipe.transform(value, 'd MMMM yyyy');
    }
    else if (type === 'year') {
      const datePipe = new DatePipe('id-ID');
      return datePipe.transform(value, 'yyyy');
    }
    else if (type === 'datetime') {
      const datePipe = new DatePipe('id-ID');
      return datePipe.transform(value, 'd MMMM yyyy / HH:mm');
    }
    else if (type === 'currency') {
      return 'Rp ' + formatNumber(value, 'id-ID');
    }
    else if (type === 'incurrency') {
      return formatNumber(value, 'id-ID');
    }
    else if (type === 'percentage') {
      return formatNumber(value, 'id-ID') + '%';
    }
    else if (type === 'phone') {
      return value;
    }
    else if (type === 'age') {
      return value + ' tahun';
    }
    else{
      return value;
    }
  }
}

function isEmpty(value: any): boolean {
  return value == null || value === '' || value !== value;
}

function strToNumber(value: number | string): number {
  // Convert strings to numbers
  if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
    return Number(value);
  }
  if (typeof value !== 'number') {
    throw new Error(`${value} is not a number`);
  }
  return value;
}
