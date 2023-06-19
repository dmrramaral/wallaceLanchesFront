import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from '../administrador.component';
import { ProdutosComponent } from '../produtos/produtos.component';

const routes: Routes = [
  { path: '', component: AdministradorComponent },
  { path: 'produtos', component: ProdutosComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingRoutingModule { }
