
import { PublicService } from './public.service';
import { Ingredientes } from '../model/ingredientes';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  produto:   Observable<Produto[]>;
 


  constructor( private publicService : PublicService) { 
    this.produto = this.publicService.listar();
  }
  ngOnInit(): void {
    
  }

  getIngredientesList(ingredientes: Produto[] | null): String | undefined {
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
