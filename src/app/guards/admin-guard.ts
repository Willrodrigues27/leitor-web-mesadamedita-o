import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window === 'undefined') {
      return true;
    }

    const usuarioId = localStorage.getItem('USUARIO_ID');
    const usuarioRole = localStorage.getItem('USUARIO_ROLE'); 

    // 🛡️ TRUQUE DE MESTRE: Remove aspas ocultas (JSON), espaços em branco e garante que fica tudo em maiúsculas
    const roleSegura = usuarioRole ? usuarioRole.replace(/['"]/g, '').trim().toUpperCase() : '';

    if (usuarioId && roleSegura === 'ROLE_ADMIN') {
      return true;
    } else {
      alert('Acesso negado. Apenas administradores podem aceder a esta área.');
      this.router.navigate(['/login']); 
      return false;
    }
  }
}