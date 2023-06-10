import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyBrlPipe } from './currency-brl.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
