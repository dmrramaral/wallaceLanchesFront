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
  ingredientes : Ingredientes[] = [];

  constructor(private produtosService: ProdutosService, private formBuilder: FormBuilder) {
    this.produtosService.listarIngredientes().subscribe((ingredientes: Ingredientes[]) => {
      this.ingredientes = ingredientes;
    });
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
      ingredientes: []
    });
  }

  onAdd(): void {
    const produto: Produto = this.registroForm.value;
    produto.ingredientes = this.ingredientes
    console.log(produto);

    this.produtosService.adicionar(produto).subscribe(() => {
      alert('Produto adicionado com sucesso!');
      // Redirecionar ou executar outras ações após adicionar o produto
    });
  }

  adicionarIngrediente(ingrediente: Ingredientes): void {
    const ingredientesControl = this.registroForm.get('ingredientes');
    if (ingredientesControl) {
      const selectedIngredients = ingredientesControl.value || [];
      const updatedIngredients = selectedIngredients.filter((id: any) => id !== ingrediente.id);
      ingredientesControl.setValue(updatedIngredients);
    }
  }

  removerIngrediente(ingrediente: Ingredientes): void {
    this.ingredientes = this.ingredientes.filter(item => item.id !== ingrediente.id);
  }
}