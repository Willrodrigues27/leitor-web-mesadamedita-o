import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboardComponent {
  
  constructor(private router: Router) {}

  abrirPermissoes() {
    this.router.navigate(['/admin/permissoes']);
  }

  cadastrarLivro() {
    this.router.navigate(['/admin/cadastro-livros']);
  }

  cadastrarMusica() {
    this.router.navigate(['/admin/cadastro-musicas']);
  }

  navegarComoLeitor() {
    this.router.navigate(['/sumario']);
  }
}