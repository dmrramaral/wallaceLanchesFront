import { Categoria } from "./categoria";
import { Ingredientes } from "./ingredientes";

export interface Produto {

    id: Number
    nome: String ;
    descricao: String;
    valor: Number;
    categoria: Categoria;
    ingredientes : Ingredientes[];

 
}
