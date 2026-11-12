import { Routes } from '@angular/router';
import { BoasVindasComponent } from './paginas/boas-vindas/boas-vindas';
import { LoginComponent } from './paginas/login/login';
import { SumarioComponent } from './paginas/sumario/sumario';
import { AdminDashboardComponent } from './paginas/admin/dashboard/dashboard';
import { HomeComponent } from './paginas/home/home';
import { LeitorComponent } from './paginas/leitor/leitor';

import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';

import { GerenciarLeitoresComponent } from './paginas/admin/gerenciar-leitores/gerenciar-leitores';
import { CadastroLivrosComponent } from './paginas/admin/cadastro-livros/cadastro-livros';
import { CadastroMusicasComponent } from './paginas/admin/cadastro-musicas/cadastro-musicas';
import { ListaMusicasComponent } from './paginas/lista-musicas/lista-musicas';

export const routes: Routes = [
  { path: '', component: BoasVindasComponent }, 
  { path: 'login', component: LoginComponent },

  // Rotas Protegidas apenas para quem tem Login (Leitor ou Admin)
  { path: 'sumario', component: SumarioComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'leitor/:id', component: LeitorComponent, canActivate: [AuthGuard] },
  
  // Rotas Protegidas EXCLUSIVAS para Admin
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/permissoes', component: GerenciarLeitoresComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/cadastro-livros', component: CadastroLivrosComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/cadastro-musicas', component: CadastroMusicasComponent, canActivate: [AuthGuard, AdminGuard] },

  { path: 'lista-musicas', component: ListaMusicasComponent },
  { path: 'cadastro-musicas', component: CadastroMusicasComponent }
];