import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLimit'
})
export class TextLimitPipe implements PipeTransform {

  transform(value: string): string {
    return value.slice(0, 117) + '...';
  }

}
