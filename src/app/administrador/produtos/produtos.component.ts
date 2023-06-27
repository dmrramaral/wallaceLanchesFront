import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/model/produto';
import { ProdutosService } from './produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']

})
export class ProdutosComponent implements OnInit{

  produto: Observable<Produto[]>;

  constructor(private produtoService: ProdutosService) {
    this.produto = this.produtoService.listar();
   
  }
  ngOnInit(): void {
    this.produto = this.produtoService.listar();
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
    this.produtoService.remover(produto).subscribe();
    alert('Removido com sucesso!');
   
    
    return this.produto = this.produtoService.listar();
  }

  onEdit() {
    alert('Editado com sucesso!');
  }

 



}
