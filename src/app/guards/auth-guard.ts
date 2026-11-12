import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // 🛡️ Blindagem contra o SSR: Impede que o servidor procure o localStorage
    if (typeof window === 'undefined') {
      return true;
    }

    const usuarioId = localStorage.getItem('USUARIO_ID');
    
    if (usuarioId) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}