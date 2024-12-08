import { Component, inject, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo } from '../models/todo.model';
import { todoItemStore } from '../totoItem.store';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule],
  template: `
    <mat-card>
      @if (todoItemStore.todos().get(todo().id)?.isUpdating) {
        <mat-spinner [diameter]="20" color="blue"></mat-spinner>
      } @else {
        <mat-card-title>{{ todo().title }}</mat-card-title>
      }

      <mat-card-actions>
        <button
          [disabled]="todoItemStore.todos().get(todo().id)?.isUpdating"
          (click)="update(todo())">
          Update
        </button>

        <button
          [disabled]="todoItemStore.todos().get(todo().id)?.isUpdating"
          (click)="delete(todo())">
          Delete
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ItemComponent implements OnInit {
  todo = input.required<Todo>();
  todoItemStore = inject(todoItemStore);

  ngOnInit(): void {
    this.todoItemStore.getTodos();
  }

  update(todo: Todo) {
    this.todoItemStore.updateTodo(todo);
  }

  delete(todo: Todo) {
    this.todoItemStore.deleteTodo(todo);
  }
}
