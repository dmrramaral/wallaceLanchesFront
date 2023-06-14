import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Sanduiche } from 'src/app/model/sanduiche';
import { SanduicheService } from './sanduiche.service';

@Component({
  selector: 'app-sanduiche',
  templateUrl: './sanduiche.component.html',
  styleUrls: ['./sanduiche.component.css'],

})
export class SanduicheComponent {
  sanduiche!: Observable<Sanduiche[]>;

  constructor( private sanduicheService : SanduicheService) { }

  ngOnInit(): void {
  this.sanduiche  = this.sanduicheService.listar();
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
