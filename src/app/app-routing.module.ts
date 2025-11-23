import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './public/cadastro/cadastro.component';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { CardapioComponent } from './public/cardapio/cardapio.component';
import { authGuard, adminGuard, publicOnlyGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Rotas públicas
  {path: '', component: PublicComponent},
  {path: 'cardapio', component: CardapioComponent},
  
  // Rotas públicas que não devem ser acessadas por usuários autenticados
  {path: 'login', component: LoginComponent, canActivate: [publicOnlyGuard]},
  {path: 'cadastro', component: CadastroComponent, canActivate: [publicOnlyGuard]},
  
  // Rotas protegidas - requerem autenticação e permissão de administrador
  {
    path: 'admin', 
    loadChildren: () => import('./administrador/administrador-routing/administrador-routing-routing.module').then(m => m.AdministradorRoutingRoutingModule),
    canActivate: [authGuard, adminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

