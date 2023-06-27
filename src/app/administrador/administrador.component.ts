import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';
import { AdministradorService } from './administrador.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent  {
  
  produto: Observable<Produto[]>;

  constructor(administradorService: AdministradorService) {
    this.produto = administradorService.listar();
    console.log(alert('Listado com sucesso!'));
 
  }
    
  }


  


