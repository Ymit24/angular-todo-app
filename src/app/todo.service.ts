import { Injectable, computed, signal } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  #todoTasks = signal<Todo[]>([{
    id: "1",
    name: 'Some name'
  }]);

  todoTasks = computed(this.#todoTasks);

  addTodoTask(todo: Todo) {
    this.#todoTasks.update((tasks) => [...tasks, todo]);
  }

  deleteTodo(todo: Todo) {
    this.#todoTasks.update((tasks) =>
      tasks.filter((v) => v !== todo)
    );
  }
}
