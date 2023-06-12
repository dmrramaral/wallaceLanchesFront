import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sanduiche } from '../model/sanduiche';
import { PublicService } from './public.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  sanduiche:   Observable<Sanduiche[]>;
  


  constructor( private publicService : PublicService) { 
    this.sanduiche = this.publicService.listar();
  }
  ngOnInit(): void {
    
  }

  getIngredientesList(ingredientes: Sanduiche[] | null): String | undefined {
    if (ingredientes === null) {
      return undefined;
    }

    const nomesIngredientes = ingredientes[0].ingredientes.map((ingrediente) => ingrediente.nomeIngrediente);
    const ultimoIngrediente = nomesIngredientes.pop();

    if (nomesIngredientes.length > 0) {
      return nomesIngredientes.join(', ') + ' e ' + ultimoIngrediente;
    } else {
      return ultimoIngrediente;
    }
  }
}
