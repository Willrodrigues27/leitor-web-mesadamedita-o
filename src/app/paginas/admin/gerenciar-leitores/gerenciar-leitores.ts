import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../../../services/livro';

@Component({
  selector: 'app-gerenciar-leitores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-leitores.html', 
  styleUrls: ['./gerenciar-leitores.css']
})
export class GerenciarLeitoresComponent implements OnInit {
  
  leitores: any[] = [];
  leitorSelecionado: any = null;
  livrosRestritos: any[] = [];

  constructor(
    private livroService: LivroService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarLeitoresReais();
  }

  // 1. Carrega os utilizadores reais do backend
  carregarLeitoresReais() {
    this.livroService.listarUsuarios().subscribe({
      next: (dados: any) => {
        console.log('DADOS REAIS RECEBIDOS DO BACKEND:', dados); 
        this.leitores = Array.isArray(dados) ? dados : (dados.content || dados.leitores || []);
        
      
        this.cdr.detectChanges(); 
      },
      error: (erro) => {
        console.error('Erro ao carregar leitores:', erro);
        alert('Erro ao buscar a lista de leitores no servidor.');
      }
    });
  }

  // 2. Seleciona o leitor e busca quais livros restritos ele tem permissão
  selecionarLeitor(leitor: any) {
    this.leitorSelecionado = leitor;
    
    // Busca os livros restritos gerais e os IDs permitidos para este leitor específico
    this.livroService.listarLivrosRestritos().subscribe({
      next: (livrosRestritosGerais) => {
        this.livroService.buscarLivrosPermitidosDoUsuario(leitor.id).subscribe({
          next: (idsPermitidos) => {
            // Mapeia os livros definindo a propriedade 'liberado' com base no backend
            this.livrosRestritos = livrosRestritosGerais.map(livro => ({
              ...livro,
              liberado: idsPermitidos.includes(livro.id!)
            }));

          
            this.cdr.detectChanges();
          },
          error: (erro) => console.error('Erro ao buscar permissões do utilizador:', erro)
        });
      },
      error: (erro) => console.error('Erro ao listar livros restritos:', erro)
    });
  }

  voltarParaLista() {
    this.leitorSelecionado = null;
    this.livrosRestritos = [];
    this.cdr.detectChanges(); 
  }

  // 3. Alterna a permissão individual de um livro e envia para o backend
  alternarLivro(livro: any) {
    livro.liberado = !livro.liberado;
    
    if (livro.liberado) {
      this.livroService.liberarLivro(this.leitorSelecionado.id, livro.id).subscribe({
        error: (erro) => console.error('Erro ao liberar livro:', erro)
      });
    } else {
      this.livroService.revogarLivro(this.leitorSelecionado.id, livro.id).subscribe({
        error: (erro) => console.error('Erro ao revogar livro:', erro)
      });
    }
  }

  // 4. Libera todos os livros de uma vez para o leitor selecionado
  liberarTodos() {
    this.livroService.liberarTodosLivrosParaUsuario(this.leitorSelecionado.id).subscribe({
      next: () => {
        this.livrosRestritos.forEach(l => l.liberado = true);
        this.cdr.detectChanges(); 
        alert('Todos os livros foram liberados com sucesso para este leitor!');
      },
      error: (erro) => {
        console.error('Erro ao liberar todos os livros:', erro);
        alert('Erro ao processar a liberação geral.');
      }
    });
  }

  voltarPainel() {
    this.router.navigate(['/admin']);
  }
}