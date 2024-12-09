import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NameTransformPipe } from './nameTransform.pipe';

@Component({
  standalone: true,
  imports: [NgFor, NameTransformPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | nameTransform: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
