import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boas-vindas',
  standalone: true,
  imports: [],
  templateUrl: './boas-vindas.html',
  styleUrls: ['./boas-vindas.css']
})
export class BoasVindasComponent {
  
  constructor(private router: Router) {}

  iniciarMeditacao() {
    this.router.navigate(['/sumario']);
  }
}