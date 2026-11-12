import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://mesadameditacaoapp.onrender.com/auth';
  
  // Track login status across the app
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((usuario: any) => {
        // A sua lógica de tratamento de permissões traduzida para Web
        let roleFinal = 'ROLE_LEITOR';
        if (usuario.role) {
            roleFinal = usuario.role;
        } else if (usuario.permissao) {
            roleFinal = usuario.permissao;
        } else if (usuario.rolesList && usuario.rolesList.length > 0) {
            roleFinal = usuario.rolesList[0];
        }

        // Guarda os dados tratados na sessão
        localStorage.setItem('USUARIO_ID', usuario.id);
        localStorage.setItem('USUARIO_ROLE', roleFinal);
        localStorage.setItem('USUARIO_NOME', usuario.nome);
        this.authStatus.next(true);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, { withCredentials: true });
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('USUARIO_ID');
  }

  getRole(): string | null {
    return localStorage.getItem('USUARIO_ROLE');
  }

  logout() {
    localStorage.clear();
    this.authStatus.next(false);
    this.router.navigate(['/']);
  }
}