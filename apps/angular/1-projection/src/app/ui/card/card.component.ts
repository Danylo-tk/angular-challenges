import { CommonModule } from '@angular/common';
import {
  Component,
  contentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ListItemTemplateDirective } from '../list-item/list-item-template.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img" />

    <section>
      @for (item of list; track item; let i = $index) {
        <ng-container
          [ngTemplateOutlet]="itemTemplate()?.templateRef ?? null"
          [ngTemplateOutletContext]="{ $implicit: item, index: i }" />
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem()">
      Add
    </button>
  `,
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<T> {
  @Input() list: T[] | null = [];
  @Input() customClass = '';
  itemTemplate = contentChild(ListItemTemplateDirective);
  @Output()
  addItem = new EventEmitter<void>();

  addNewItem() {
    this.addItem.emit();
  }
}
