import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../../services/livro';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  tituloSecao: string = '';
  livros: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private livroService: LivroService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const secaoId = params['id'];
      this.tituloSecao = params['titulo'] || 'Livros da Seção';
      
      if (secaoId) {
        this.carregarLivrosDaSecao(Number(secaoId));
      }
    });
  }

  carregarLivrosDaSecao(secaoId: number) {
    this.livroService.buscarLivrosPorSecao(secaoId).subscribe({
      next: (dados: any) => {
        this.livros = dados; 
        
        this.cdr.detectChanges(); 
        
        console.log('Livros carregados para esta seção:', this.livros);
      },
      error: (erro: any) => console.error('Erro ao carregar livros da seção:', erro)
    });
  }

  abrirLivro(livroId: number) {
    this.router.navigate(['/leitor', livroId]);
  }

  voltarSumario() {
    this.router.navigate(['/sumario']);
  }
}