import { Categoria } from "./categoria";
import { Ingredientes } from "./ingredientes";

export class Produto {

    public id: Number
    public nome: String ;
    public descricao: String;
    public valor: Number;
    public categoria: Categoria;
    public ingredientes : Ingredientes[];

    constructor(id: Number, nome: String, descricao: String, valor: Number, categoria: Categoria, ingredientes : Ingredientes[]) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
        this.categoria = categoria;
        this.ingredientes = ingredientes;
    }
}
