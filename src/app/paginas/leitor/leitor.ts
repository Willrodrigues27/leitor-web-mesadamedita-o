import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../../services/livro';

@Component({
  selector: 'app-leitor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leitor.html',
  styleUrls: ['./leitor.css']
})
export class LeitorComponent implements OnInit {
  capitulos: any[] = [];
  paginaAtualIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private livroService: LivroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarDetalhesLivro(Number(id));
    }
  }

  carregarDetalhesLivro(id: number) {
    this.livroService.buscarDetalhesLivro(id).subscribe({
      next: (dados: any) => {
        this.capitulos = dados;
        this.cdr.detectChanges(); 
      },
      error: (erro: any) => console.error('Erro ao carregar capítulos:', erro)
    });
  }

  proximaPagina() {
    if (this.capitulos.length > 0 && this.paginaAtualIndex < this.capitulos.length - 1) {
      this.paginaAtualIndex++;
      window.scrollTo(0, 0);
    }
  }

  paginaAnterior() {
    if (this.paginaAtualIndex > 0) {
      this.paginaAtualIndex--;
      window.scrollTo(0, 0);
    }
  }

  voltarSumario() {
    this.router.navigate(['/sumario']);
  }
}