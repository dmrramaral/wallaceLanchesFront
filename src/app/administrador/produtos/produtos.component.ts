import { Component } from '@angular/core';
import { AdministradorComponent } from '../administrador.component';
import { AdministradorService } from '../administrador.service';
import { Sanduiche } from 'src/app/model/sanduiche';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']

})
export class ProdutosComponent {

  sanduiche: Observable<Sanduiche[]>;

  constructor(private administradorService: AdministradorService) {
    this.sanduiche = this.administradorService.listar();
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

  onAdd() {
    this.administradorService.adicionar();
  }


}
