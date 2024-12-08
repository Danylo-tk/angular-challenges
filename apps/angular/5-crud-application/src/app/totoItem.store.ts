import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';
import { todoStore } from './todo.store';

type TodoItemType = {
  todos: Map<number, Todo>;
};

const initialState: TodoItemType = {
  todos: new Map(),
};

export const todoItemStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((state) => {
    const todoService = inject(TodoService);
    const todosStore = inject(todoStore);

    return {
      getTodos: function (): void {
        const todosMap = new Map();
        const todos = todosStore.todos();

        todos.forEach((t) => {
          todosMap.set(t.id, t);
        });

        patchState(state, { todos: todosMap });
      },

      updateTodo: function (td: Todo): void {
        const todos = state.todos();

        if (todos.get(td.id)) {
          (todos.get(td.id) as Todo).isUpdating = true;
        }

        patchState(state, { todos: todos });
        todoService.updateTodo(td).subscribe({
          next: (updatedTodo) => {
            todosStore.updateTodo(updatedTodo);
            this.resetItemUpdate();
          },
          error: () => {
            patchState(state, { todos: todos });
          },
        });
      },

      deleteTodo: function (todo: Todo): void {
        const todos = state.todos();

        if (todos && todos.size > 0 && todos.get(todo.id)) {
          (todos.get(todo.id) as Todo).isUpdating = true;
        }

        patchState(state, { todos: todos });
        todoService.deleteTodo(todo.id).subscribe({
          next: () => {
            todosStore.deleteTodo(todo.id);
            this.resetItemUpdate();
          },
          error: () => {
            this.resetItemUpdate();
          },
        });
      },

      resetItemUpdate: function (): void {
        const todos = state.todos();

        todos.forEach((todo) => {
          todo.isUpdating = false;
        });

        patchState(state, { todos: todos });
      },
    };
  }),
);
