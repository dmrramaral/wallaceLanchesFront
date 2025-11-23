
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';
import { PublicService } from './public.service';

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.css'],
    standalone: false
})
export class PublicComponent implements OnInit {
  produto:   Observable<Produto[]>;
 


  constructor( private publicService : PublicService) { 
    this.produto = this.publicService.listar();
  }
  ngOnInit(): void {
    
  }
  getIngredientesList(produtos: Produto | null): string | undefined {
    if (produtos === null || !produtos.ingredientes || produtos.ingredientes.length === 0) {
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

  getValor(produto: Produto): number {
    return (produto.valor || produto.price || 0) as number;
  }

  getNome(produto: Produto): string {
    return (produto.nome || produto.name || '') as string;
  }

  getDescricao(produto: Produto): string {
    return (produto.descricao || produto.description || '') as string;
  }

  getCategoria(produto: Produto): string {
    return (produto.categoria || produto.category || '') as string;
  }
}
