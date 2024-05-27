import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TodoService } from './todo.service';
import { TodoStore } from './todo.store';
import { DividerModule } from 'primeng/divider';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { HeaderBarComponent } from './header-bar/header-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    ToastModule,
    CardModule,
    CreateTodoComponent,
    DividerModule,
    CommonModule,
    LayoutModule,
    HeaderBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {
  messageService = inject(MessageService);
  todoStore = inject(TodoStore);
  breakpointObserver = inject(BreakpointObserver);

  isDesktop$ = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge]).pipe(
    map((x) => x.matches)
  );
}
