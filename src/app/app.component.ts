import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TodoService } from './todo.service';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    ToastModule,
    CardModule,
    CreateTodoComponent,
    TodoListItemComponent,
    DividerModule,
    TableModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {
  messageService = inject(MessageService);
  todoService = inject(TodoService);

  onCreateTodo(todo: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'New Task',
      detail: 'Created the new task: ' + todo + '!'
    });
  }
}
