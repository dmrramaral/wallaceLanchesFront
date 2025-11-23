import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/model/produto';
import { ProdutosService } from './produtos.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.css'],
    standalone: false
})
export class ProdutosComponent implements OnInit{

  produto: Observable<Produto[]>;

  constructor(private produtoService: ProdutosService, private router : Router) {
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

  onEdit(produto: Produto) {
    // Navega para a página de cadastro com o ID do produto como parâmetro
    this.router.navigate(['/admin/cadastrar-produtos'], { queryParams: {id: produto.id, edit: true } });
  
  }

 



}
