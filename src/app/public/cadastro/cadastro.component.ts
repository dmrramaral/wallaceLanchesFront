import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/model/cliente';
import { CadastroService } from './cadastro.service';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css'],
    providers: [CadastroService],
    standalone: false
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;

  cliente!: Cliente;

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
  ) {



  }

  ngOnInit(): void {
    this.createForm();

  }


  onSubmit(): void {

    this.cadastroService.cadastrar(this.cadastroForm.value).subscribe({
      next: (data) => {
        alert("Cliente cadastrado com sucesso!");
        this.cadastroForm?.reset();
      },
      error: (err) => {
        alert("Erro ao cadastrar cliente!");
      }
    });

  }

  private createForm() {
    this.cadastroForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      telefone: this.formBuilder.control('', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{4}')]),
      cpf: this.formBuilder.control('', [Validators.required, Validators.pattern('[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}')]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }



}
