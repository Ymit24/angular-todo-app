import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {
  title = 'todo-app';

  messageService = inject(MessageService);

  clickMe() {
    this.messageService.add({
      severity: 'success',
      summary: 'Successful!',
      detail: 'Some content here!'
    });
  }
}
