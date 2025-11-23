import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { PublicModule } from './public/public.module';
import { CadastroComponent } from './public/cadastro/cadastro.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministradorComponent } from './administrador/administrador.component';
import { ProdutosComponent } from './administrador/produtos/produtos.component';
import { CadastrarProdutosComponent } from './administrador/produtos/cadastrar-produtos/cadastrar-produtos.component';
import { authInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({ declarations: [
        AppComponent,
        PublicComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        AdministradorComponent,
        ProdutosComponent,
        CadastrarProdutosComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatTabsModule,
        BrowserAnimationsModule], providers: [
        provideHttpClient(
            withInterceptors([authInterceptor])
        )
    ] })
export class AppModule { }

