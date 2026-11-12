import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  isLoginMode = true; // true = Login view, false = Register view
  
  // Form bindings
  nome = '';
  email = '';
  senha = '';

  constructor(private auth: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    // Clear fields when toggling
    this.nome = '';
    this.email = '';
    this.senha = '';
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.auth.login({ email: this.email, senha: this.senha }).subscribe({
        next: () => this.redirectBasedOnRole(),
        error: (err) => console.error('Login failed', err)
      });
    } else {
      this.auth.register({ nome: this.nome, email: this.email, senha: this.senha }).subscribe({
        next: () => {
          console.log('Registration successful, please login');
          this.toggleMode();
        },
        error: (err) => console.error('Registration failed', err)
      });
    }
  }

 private redirectBasedOnRole() {
    // Vamos buscar direto à fonte (localStorage) para não haver dúvidas
    const role = localStorage.getItem('USUARIO_ROLE') || '';
    
    // 🕵️ O NOSSO DETETIVE: Vai imprimir a resposta no F12
    console.log('A ROLE QUE O JAVA ENVIOU FOI:', role);
    
    if (role.toUpperCase().includes('ADMIN')) {
      console.log('Entrou no IF do Admin!');
      this.router.navigate(['/admin']);
    } else {
      console.log('Caiu no ELSE do Leitor!');
      this.router.navigate(['/sumario']);
    }
  }
}