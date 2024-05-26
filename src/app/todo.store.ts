import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { Todo, TodoStatus } from './todo';
import { inject } from '@angular/core';
import { TodoService } from './todo.service';
import { delay, tap, of, switchMap, pipe, catchError } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

type TodoState = {
  todos: Todo[];
  isLoading: boolean;
  error: string;
};

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: '',
}

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(
    initialState
  ),
  withMethods((store, todoService = inject(TodoService)) => ({
    loadAll: rxMethod<void>(pipe(
      tap(() => patchState(store, { isLoading: true })),
      switchMap(() =>
        todoService.loadAll().pipe(
          tapResponse({
            next: (todos) => patchState(store, { todos }),
            error: () => patchState(store, { error: 'Failed to load!' })
            ,
            finalize: () => patchState(store, { isLoading: false })
          })
        )
      )
    )),
    createTodo: rxMethod<{ name: string, status: TodoStatus }>(pipe(
      tap(() => patchState(store, { isLoading: true })),
      tap(({ name, status }) => {
        console.log('trying to create todo with', name, ' and status ', status);
      }),
      switchMap(({ name, status }) => todoService.createTodo({ id: '', name, status }).pipe(
        tapResponse({
          next: (todo) => patchState(store, (state) => ({ ...state, todos: [...state.todos, todo] })),
          error: () => patchState(store, { error: 'Failed to load!' }),
          finalize: () => patchState(store, { isLoading: false })
        })
      ))
    )),
    createTodo2(name: string, status: TodoStatus): void {
      const createdTodo: Todo = { id: '', name, status };
      todoService.createTodo(createdTodo);
      patchState(store, (state) => ({
        todos: [...state.todos, createdTodo]
      }));
    }
  })),
  withHooks({
    onInit(store) {
      store.loadAll();
    }
  })
);
