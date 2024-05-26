import { Component, EventEmitter, Output, inject } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TodoStore } from '../todo.store';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    FormsModule,
    ToastModule
  ],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss',
  providers: [MessageService],
})
export class CreateTodoComponent {
  messageService = inject(MessageService);
  todoName?: string;

  todoStore = inject(TodoStore);

  createTodo() {
    if (!this.todoName) {
      this.messageService.add({
        severity: 'error',
        summary: 'No name!',
        detail: 'Need to add a name before you can create a todo!'
      });
      return;
    }
    this.todoStore.createTodo({ name: this.todoName, status: 'active' });
    this.todoName = '';
  }
}
