import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutosService } from '../produtos.service';
import { Produto } from 'src/app/model/produto';
import { Observable } from 'rxjs';
import { Ingredientes } from 'src/app/model/ingredientes';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent {
  registroForm!: FormGroup;
  ingredientes : Observable<Ingredientes[]>

  constructor(private produtosService: ProdutosService, private formBuilder: FormBuilder) {
    this.ingredientes = this.produtosService.listarIngredientes();
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
      ingredientes: ''
    });
  }

  onAdd(): void {
    const produto: Produto = this.registroForm.value;
    this.produtosService.adicionar(produto).subscribe(() => {
      alert('Produto adicionado com sucesso!');
      // Redirecionar ou executar outras ações após adicionar o produto
    });
  }
}