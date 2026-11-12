import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro, Capitulo } from '../models/app.models';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiUrl = 'https://mesadameditacaoapp.onrender.com';

  constructor(private http: HttpClient) {}

  // Helper para montar o @Header("Usuario-Id") automaticamente
  private getHeaders(): { headers: HttpHeaders } {
    const usuarioId = localStorage.getItem('USUARIO_ID') || '';
    return { headers: new HttpHeaders({ 'Usuario-Id': usuarioId }) };
  }

  // ----------------- BUSCAS GERAIS -----------------

  buscarTodosLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/livros`);
  }

  buscarLivrosPorSecao(secaoId: number): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/livros/secao/${secaoId}`, this.getHeaders());
  }

  realizarBuscaNoBackend(genero: string): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/livros/filtro?genero=${genero}`);
  }

  realizarBuscaPorTituloNoBackend(termo: string): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/livros/busca?termo=${termo}`);
  }

  realizarPesquisaAvancadaNoBackend(termo: string): Observable<Capitulo[]> {
    return this.http.get<Capitulo[]>(`${this.apiUrl}/livros/pesquisa?termo=${termo}`);
  }

  // ----------------- CAPÍTULOS -----------------

  buscarCapitulos(livroId: number): Observable<Capitulo[]> {
    return this.http.get<Capitulo[]>(`${this.apiUrl}/livros/${livroId}/capitulos`, this.getHeaders());
  }

  buscarCapituloPorIdUnico(capituloId: number): Observable<Capitulo> {
    return this.http.get<Capitulo>(`${this.apiUrl}/livros/capitulo/${capituloId}`);
  }

  adicionarCapitulo(livroId: number, capitulo: Capitulo): Observable<Capitulo> {
    return this.http.post<Capitulo>(`${this.apiUrl}/api/capitulos/livro/${livroId}`, capitulo, this.getHeaders());
  }

  editarCapitulo(capituloId: number, capitulo: Capitulo): Observable<Capitulo> {
    return this.http.put<Capitulo>(`${this.apiUrl}/api/capitulos/${capituloId}`, capitulo, this.getHeaders());
  }

  // ----------------- ADMINISTRAÇÃO E PERMISSÕES -----------------

  criarLivro(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(`${this.apiUrl}/livros`, livro, this.getHeaders());
  }

  // Adicionado para suportar o Cadastro de Música
  criarMusica(musica: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/livros`, musica, this.getHeaders());
  }

  importarLivroComCapitulos(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(`${this.apiUrl}/livros/importar`, livro, this.getHeaders());
  }

  listarLivrosRestritos(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/livros/restritos`, this.getHeaders());
  }

  // Adicionado para listar os utilizadores reais na Gestão de Leitores
 listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/auth/leitores`, this.getHeaders());
  }

  buscarLivrosPermitidosDoUsuario(usuarioId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/auth/${usuarioId}/livros-permitidos`, this.getHeaders());
  }

  liberarLivro(usuarioId: number, livroId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/${usuarioId}/liberar-livro/${livroId}`, {}, this.getHeaders());
  }

  revogarLivro(usuarioId: number, livroId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/auth/${usuarioId}/revogar-livro/${livroId}`, this.getHeaders());
  }

  liberarTodosLivrosParaUsuario(usuarioId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/${usuarioId}/liberar-todos`, {}, this.getHeaders());
  }

  buscarDetalhesLivro(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/livros/${id}/capitulos`, this.getHeaders());
  }
}