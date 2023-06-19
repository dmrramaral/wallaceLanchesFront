import { Component } from '@angular/core';
import { Sanduiche } from '../model/sanduiche';
import { Observable } from 'rxjs';
import { AdministradorService } from './administrador.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
  sanduiches!: Observable<Sanduiche[]>;

  constructor(private administradorService: AdministradorService) {
    this.sanduiches = this.administradorService.listar();
  }


  

}
