import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameTransform',
  standalone: true,
})
export class NameTransformPipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
