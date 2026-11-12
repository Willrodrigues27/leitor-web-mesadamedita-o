import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sumario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sumario.html',
  styleUrls: ['./sumario.css']
})
export class SumarioComponent {
  
  nomeUsuario: string = ''; 
  saudacao: string = this.nomeUsuario ? `${this.nomeUsuario}, em que vamos meditar hoje?` : 'Em que vamos meditar hoje?';

  secoes = [
    { id: 1, nome: "I. Ensinos Bíblicos" },
    { id: 2, nome: "II. Palavra Profética" },
    { id: 3, nome: "III. Ensinos Família" },
    { id: 4, nome: "IV. Ensino Casais" },
    { id: 5, nome: "V. Ensino Natureza" },
    { id: 6, nome: "VI. Músicas" }
  ];

  constructor(private router: Router) {}

  abrirSecao(secao: any) {
    if (secao.id === 6) {
      this.router.navigate(['/lista-musicas']);
    } else {
      this.router.navigate(['/home'], { queryParams: { id: secao.id, titulo: secao.nome } });
    }
  }

  executarBusca(texto: string) {
    console.log("Pesquisando por:", texto);
  }

  voltar() {
    const role = localStorage.getItem('USUARIO_ROLE') || '';
    
    if (role.toUpperCase().includes('ADMIN')) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }
}