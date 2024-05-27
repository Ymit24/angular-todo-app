import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-four-o-four',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule
  ],
  templateUrl: './four-o-four.component.html',
  styleUrl: './four-o-four.component.scss'
})
export class FourOFourComponent {

}
