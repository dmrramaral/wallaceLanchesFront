import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CurrencyBrlPipe } from '../currency-brl.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardapioComponent } from './cardapio/cardapio.component';


@NgModule({
  declarations: [
    CadastroComponent,
    CurrencyBrlPipe,
    CardapioComponent,
    
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    
    
  ]})
export class PublicModule { }
