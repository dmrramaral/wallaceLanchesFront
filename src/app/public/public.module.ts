import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CurrencyBrlPipe } from '../currency-brl.pipe';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CadastroComponent,
    CurrencyBrlPipe
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HttpClientModule
    
    
  ]
})
export class PublicModule { }
