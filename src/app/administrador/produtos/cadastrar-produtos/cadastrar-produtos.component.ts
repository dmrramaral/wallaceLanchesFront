import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ingredientes } from 'src/app/model/ingredientes';
import { Produto } from 'src/app/model/produto';
import { ProdutosService } from '../produtos.service';

@Component({
    selector: 'app-cadastrar-produtos',
    templateUrl: './cadastrar-produtos.component.html',
    styleUrls: ['./cadastrar-produtos.component.css'],
    standalone: false
})
export class CadastrarProdutosComponent {
  registroForm!: FormGroup;
  listarIngredientes: Observable<Ingredientes[]>;
  ingredientes: Ingredientes[] = [];
  produtoId : string | null = null;

  constructor(private produtosService: ProdutosService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.listarIngredientes = this.produtosService.listarIngredientes();

    this.route.queryParams.subscribe(params => {
      this.produtoId = params['id']; // Obtém o ID do produto da query parameter 'id'
      
      if (this.produtoId) {
        // Aqui você pode buscar os dados do produto pelo ID e preencher os campos do formulário de edição
        this.produtosService.buscarPorId(this.produtoId).subscribe((produto) => {
          this.registroForm = this.formBuilder.group({
            nome: produto.nome || produto.name,
            descricao: produto.descricao || produto.description,
            valor: produto.valor || produto.price,
            categoria: produto.categoria || produto.category,
            ingredientes: produto.ingredientes || produto.ingredients
          });
        }, (error) => {
          alert('Erro ao buscar produto por ID');
        }
        );
      }
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
      ingredientes: [{}] 
    });
  }

  onAdd(): void {
    const produto: Produto = this.registroForm.value;
    /* Condição pra que se os ingredientes não tiverem selecionado nenhum ele retornar array 0 */


    if (produto.categoria != 'SANDUICHE') {
      produto.ingredientes = [];
    }else{
      this.ingredientes = this.ingredientes;
    }

    if (this.produtoId) {
      produto._id = this.produtoId;
      produto.id = this.produtoId as any;
      this.produtosService.atualizar(produto).subscribe(() => {
        alert('O '+produto.nome + produto.ingredientes+ 'foi atualizado com sucesso!');
        this.router.navigate(['/admin/produtos']);
      });
      return;
    }
    
    console.log(produto);
    this.produtosService.adicionar(produto).subscribe(() => {
      alert('Produto cadastrado com sucesso!');
    });

    this.router.navigate(['/admin/produtos']);
    
  }
}


