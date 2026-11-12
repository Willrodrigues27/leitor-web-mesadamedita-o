import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MusicaService } from '../../services/musica';

@Component({
  selector: 'app-lista-musicas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-musicas.html',
  styleUrls: ['./lista-musicas.css']
})
export class ListaMusicasComponent implements OnInit {
  
  musicas: any[] = [];
  musicaSelecionada: any = null;
  linhasFormatadas: { texto: string; isAcorde: boolean }[] = [];

  constructor(
    private musicaService: MusicaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarMusicas();
  }

  // 1. Busca as músicas salvas no pgAdmin através do Spring Boot
  carregarMusicas() {
    this.musicaService.listarTodas().subscribe({
      next: (dados) => {
        this.musicas = dados;
        this.musicas = dados.sort((a, b) => a.titulo.localeCompare(b.titulo));
        this.cdr.detectChanges(); // Força a tela a desenhar a lista imediatamente
      },
      error: (erro) => {
        console.error('Erro ao carregar a lista de músicas:', erro);
      }
    });
  }

  // 2. Abre a música e prepara o visual da cifra
selecionarMusica(musica: any) {
    this.musicaSelecionada = musica;
    this.processarCifra(musica);
    this.cdr.detectChanges();
  }

  private processarCifra(musica: any) {
    if (!musica) return;
    this.linhasFormatadas = [];

    // 1. Processamento Inteligente do Java
    if (musica.composicao && Array.isArray(musica.composicao)) {
      musica.composicao.forEach((item: any) => {
        
        // --- TRATAMENTO DOS ACORDES ---
        if (item.cifras && Array.isArray(item.cifras) && item.cifras.length > 0) {
          let linhaReconstruida = '';
          let ultimaPos = 0;
          
          // Ordena as notas da esquerda para a direita para evitar erros de renderização
          const cifrasOrdenadas = [...item.cifras].sort((a, b) => (a.posicao || 0) - (b.posicao || 0));

          cifrasOrdenadas.forEach((c: any) => {
            // Usa o nome exato que o Java mandou ('nota' e 'posicao')
            const textoAcorde = String(c.nota || '');
            const posicao = Number(c.posicao);
            
            // Adiciona os espaços em branco para empurrar o acorde para o lugar certo
            if (!isNaN(posicao) && posicao >= ultimaPos) {
              linhaReconstruida += ' '.repeat(posicao - ultimaPos) + textoAcorde;
              ultimaPos = posicao + textoAcorde.length;
            } else {
              linhaReconstruida += (linhaReconstruida ? ' ' : '') + textoAcorde;
            }
          });
          
          this.linhasFormatadas.push({ texto: linhaReconstruida, isAcorde: true });
        } 
        else if (item.cifras && typeof item.cifras === 'string' && item.cifras.trim() !== '') {
          this.linhasFormatadas.push({ texto: String(item.cifras), isAcorde: true });
        }

        // --- TRATAMENTO DA LETRA ---
        if (item.letra && typeof item.letra === 'string' && item.letra.trim() !== '') {
          this.linhasFormatadas.push({ texto: String(item.letra), isAcorde: false });
        }
        
        // --- ESPAÇOS ENTRE ESTROFES ---
        if ((!item.cifras || item.cifras.length === 0) && (!item.letra || item.letra.trim() === '')) {
           this.linhasFormatadas.push({ texto: '', isAcorde: false }); 
        }
      });
    } 
    
    // 2. Fallback de Segurança
    else if (musica.cifra) {
      const linhas = String(musica.cifra).split('\n');
      const regexAcorde = /^(\s*([A-G][b#]?(m|M|maj|min|dim|aug|sus)?\d*(\/[A-G][b#]?)?)\s*)+$/;
      
      this.linhasFormatadas = linhas.map(linha => {
        const textoSeguro = linha || ''; 
        return { texto: textoSeguro, isAcorde: regexAcorde.test(textoSeguro.trim()) && textoSeguro.trim().length > 0 };
      });
    }
  }


  voltarParaLista() {
    this.musicaSelecionada = null;
    this.linhasFormatadas = [];
    this.cdr.detectChanges();
  }

  voltarPainel() {
    this.router.navigate(['/admin']); // Ou a rota principal que desejar
  }
}