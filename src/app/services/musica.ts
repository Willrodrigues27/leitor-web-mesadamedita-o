import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private apiUrl = 'https://mesadameditacaoapp.onrender.com';

  constructor(private http: HttpClient) {}

  private getHeaders(): { headers: HttpHeaders } {
    const usuarioId = localStorage.getItem('USUARIO_ID') || '';
    return { headers: new HttpHeaders({ 'Usuario-Id': usuarioId }) };
  }

  listarTodas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/musicas`);
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/musicas/${id}`);
  }

  listarPorSecao(secaoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/musicas/secao/${secaoId}`);
  }

  cadastrarMusica(dto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/musicas`, dto, this.getHeaders());
  }

  editarMusica(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/musicas/${id}`, dto, this.getHeaders());
  }
}