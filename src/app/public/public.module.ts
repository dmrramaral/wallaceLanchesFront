import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';


@NgModule({
  declarations: [
    CadastroComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    
  ]
})
export class PublicModule { }
