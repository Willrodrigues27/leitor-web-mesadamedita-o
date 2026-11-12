import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../../../services/livro';
import { Livro } from '../../../models/app.models';

@Component({
  selector: 'app-cadastro-livros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-livros.html',
  styleUrls: ['./cadastro-livros.css']
})
export class CadastroLivrosComponent {
  
  livro: Livro = {
    titulo: '',
    genero: '',
    descricao: '',
    secao_id: 1,
    restrito: false
  };

  // Controlo dos capítulos/páginas
  numeroCapituloAtual: number = 1;
  
  paginaAtual = {
    titulo: '',
    conteudo: ''
  };

  // Lista para acumular as páginas criadas antes de salvar o livro completo
  paginasAcumuladas: any[] = [];

  constructor(private livroService: LivroService, private router: Router) {}

  onSecaoChange() {
    if (Number(this.livro.secao_id) === 3) {
      this.livro.restrito = true;
    } else {
      this.livro.restrito = false;
    }
  }

  // Botão Azul: Guarda a página atual na memória e limpa os campos para a próxima
  adicionarProximaPagina() {
    if (!this.paginaAtual.titulo || !this.paginaAtual.conteudo) {
      alert('Preencha o título e o conteúdo da página atual antes de avançar.');
      return;
    }

    // Adiciona à lista de páginas
    this.paginasAcumuladas.push({ ...this.paginaAtual });

    alert(`Página ${this.numeroCapituloAtual} adicionada com sucesso! Pode escrever a seguinte.`);
    
    // Limpa para a próxima página e incrementa o número do capítulo
    this.paginaAtual = { titulo: '', conteudo: '' };
    this.numeroCapituloAtual++;
  }

  // Botão Verde: Salva o livro inteiro com todas as páginas acumuladas
  salvarLivroCompleto() {
    if (!this.livro.titulo || !this.livro.descricao) {
      alert('Por favor, preencha o Título Geral e a Descrição do Livro!');
      return;
    }

    // Se o utilizador escreveu uma página agora mas não clicou no botão azul, incluímos-la também
    if (this.paginaAtual.titulo && this.paginaAtual.conteudo) {
      this.paginasAcumuladas.push({ ...this.paginaAtual });
      this.paginaAtual = { titulo: '', conteudo: '' };
    }

    if (this.paginasAcumuladas.length === 0) {
      alert('Adicione pelo menos uma página/capítulo ao livro antes de salvar.');
      return;
    }

    // 1. Mapeia a lista acumulada para a estrutura exata exigida pelo Capitulo.java
    const capitulosFormatados = this.paginasAcumuladas.map((pag, index) => ({
      numeroCapitulo: index + 1,
      tituloCapitulo: pag.titulo,
      conteudo: pag.conteudo
    }));

    // 2. Altera a chave de 'paginas' para 'capitulos' (exigida pela entidade Livro.java)
    const livroParaEnviar: any = {
      ...this.livro,
      capitulos: capitulosFormatados
    };

    this.livroService.criarLivro(livroParaEnviar).subscribe({
      next: (resposta) => {
        alert('Livro completo salvo com sucesso no acervo!');
        this.voltar();
      },
      error: (erro) => {
        console.error('Erro ao salvar livro:', erro);
        alert('Erro ao guardar o livro completo. Verifique a ligação.');
      }
    });
  }

  voltar() {
    this.router.navigate(['/admin']);
  }
}