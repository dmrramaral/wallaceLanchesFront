import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutosService } from '../produtos.service';
import { Produto } from 'src/app/model/produto';
import { Observable, switchMap } from 'rxjs';
import { Ingredientes } from 'src/app/model/ingredientes';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent {
  registroForm!: FormGroup;
  listarIngredientes: Observable<Ingredientes[]>;
  ingredientes: Ingredientes[] = [];

  constructor(private produtosService: ProdutosService, private formBuilder: FormBuilder) {
    this.listarIngredientes = this.produtosService.listarIngredientes();
  }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(): void {
    this.registroForm = this.formBuilder.group({
      nome: '',
      descricao: '',
      valor: 0,
      categoria: '',
      ingredientes: [{}] 
    });
  }

  onAdd(): void {
    const produto: Produto = this.registroForm.value;
    /* Condição pra que se os ingredientes não tiverem selecionado nenhum ele retornar array 0 */
    if (produto.ingredientes[0] == null) {
      produto.ingredientes = [];
    }else{
      this.ingredientes = this.ingredientes;
    }


    console.log(produto);
    this.produtosService.adicionar(produto).subscribe(() => {
      alert('Produto cadastrado com sucesso!');
    });
  }
}


