import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrencyBrlPipe } from '../currency-brl.pipe';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { PublicRoutingModule } from './public-routing.module';


@NgModule({ declarations: [
        CadastroComponent,
        CurrencyBrlPipe,
        CardapioComponent,
    ],
    exports: [], imports: [CommonModule,
        PublicRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class PublicModule { }
