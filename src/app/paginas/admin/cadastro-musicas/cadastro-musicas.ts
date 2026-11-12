import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MusicaService } from '../../../services/musica';

@Component({
  selector: 'app-cadastro-musicas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-musicas.html',
  styleUrls: ['./cadastro-musicas.css']
})
export class CadastroMusicasComponent {
  
  musica = {
    titulo: '',  
    artista: '', 
    introducao: '', 
    cifra: '',
    secao_id: 6
  };

  constructor(private musicaService: MusicaService, private router: Router) {} // 🟢 Injeção corrigida

  salvarMusica() {
    if (!this.musica.titulo || !this.musica.cifra) {
      alert('Por favor, preencha pelo menos o título e a cifra da música!');
      return;
    }

    // Usa o método cadastrarMusica do seu MusicaService
    this.musicaService.cadastrarMusica(this.musica).subscribe({
      next: () => {
        alert('Música cadastrada com sucesso!');
        this.voltar();
      },
      error: (erro: any) => {
        console.error('Erro ao salvar música:', erro);
        alert('Erro ao registar a música. Verifique a ligação ao servidor.');
      }
    });
  }

  voltar() {
    this.router.navigate(['/admin']);
  }
}