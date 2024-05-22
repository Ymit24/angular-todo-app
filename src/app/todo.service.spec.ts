import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('shouldAddTodo', () => {
    expect(service.todoTasks.length == 1);
    service.addTodoTask({ id: '2', name: 'demo', status: 'complete' });
    expect(service.todoTasks.length == 2);
  });
  it('shouldRemoveTodo', () => {

    expect(service.todoTasks.length == 1);
    expect(false);
  });
});
