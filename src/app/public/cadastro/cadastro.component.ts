import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/model/cliente';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers : [CadastroService]
})
export class CadastroComponent implements OnInit {

   cadastroForm!: FormGroup;

  private cliente!: Cliente;

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
  ) { 
    
    
    
  }

  ngOnInit(): void {
    this.createForm();

  }


  onSubmit(): void {
    console.log(this.cadastroForm?.value);
    console.log(this.cliente.nome)
    this.cadastroService.cadastrar(this.cadastroForm.value).subscribe(
      data => {
        alert("Cliente cadastrado com sucesso!");
        this.cadastroForm?.reset();
      },
      err => {
        alert("Erro ao cadastrar cliente!");
      }
    );
 
  }

  private createForm(){
    this.cadastroForm = this.formBuilder.group({
      nome: this.formBuilder.control('',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      telefone: this.formBuilder.control('',[Validators.required, Validators.pattern('[0-9]{4}-[0-9]{4}')]),
      cpf: this.formBuilder.control('',[Validators.required, Validators.pattern('[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}')]),
      email: this.formBuilder.control('',[Validators.required, Validators.email]),
      password: this.formBuilder.control('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }



}
