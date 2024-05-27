import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    RippleModule,
    SkeletonModule
  ],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss'
})
export class HeaderBarComponent {
  @Input() showBackButton: boolean = false;
}
