import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from '../administrador.component';
import { ProdutosComponent } from '../produtos/produtos.component';
import { CadastrarProdutosComponent } from '../produtos/cadastrar-produtos/cadastrar-produtos.component';

const routes: Routes = [
  { path: '', component: AdministradorComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'cadastrar-produtos', component: CadastrarProdutosComponent },
  
  



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingRoutingModule { }
