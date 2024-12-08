import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemComponent } from './components/item.component';
import { todoStore } from './todo.store';

@Component({
  standalone: true,
  imports: [CommonModule, ItemComponent, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <div style="margin: 2rem;">
      @if (todosStore.isLoading()) {
        <mat-spinner color="blue"></mat-spinner>
      }

      <div style="display: flex; flex-direction: column; gap: 1rem">
        @for (todo of todosStore.todos(); track todo.id) {
          <app-item [todo]="todo"></app-item>
        }
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todosStore = inject(todoStore);

  ngOnInit(): void {
    this.todosStore.getTodos();
  }
}
