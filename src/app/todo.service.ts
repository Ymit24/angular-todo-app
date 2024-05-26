import { Injectable, computed, inject, signal } from '@angular/core';
import { Todo } from './todo';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, distinctUntilChanged, tap } from 'rxjs';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  http = inject(HttpClient);

  loadAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${API_URL}/todo`).pipe(
      tap((todos) => {
        console.log('got todos:', todos);
      }),
    );
  }

  createTodo(todo: Todo): Observable<Todo> {
    console.log('creating a new todo!');
    return this.http.post<Todo>(`${API_URL}/todo`, todo).pipe(
      tap((res) => {
        console.log('finished creating the todo!', res);
      }),
    );
  }
}
