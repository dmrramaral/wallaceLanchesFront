import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/model/produto';
import { AdministradorService } from '../administrador.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']

})
export class ProdutosComponent {

  produto: Observable<Produto[]>;

  constructor(private administradorService: AdministradorService) {
    this.produto = this.administradorService.listar();
  }



  getIngredientesList(produtos: Produto | null): string | undefined {
    if (produtos === null) {
      return undefined;
    }

    const nomesIngredientes = produtos.ingredientes.map((ingrediente) => ingrediente.nomeIngrediente);
    const ultimoIngrediente = nomesIngredientes.pop();

    if (nomesIngredientes.length > 0) {
      return nomesIngredientes.join(', ') + ' e ' + ultimoIngrediente;
    } else {
      return ultimoIngrediente?.toString();
    }
  }

  onAdd() {
    alert('Adicionado com sucesso!');
  }

  onRemove(produto: Produto) {
    this.administradorService.remover(produto.id).subscribe();
    alert('Removido com sucesso!');
    console.log(produto.id);
    return this.administradorService.listar();
  }

  onEdit() {
    alert('Editado com sucesso!');
  }



}
