import { Ingredientes } from "./ingredientes";

export class Sanduiche {

    public id: Number
    public nome: String ;
    public ingredientes : Ingredientes[];
    public valorSanduiche: Number;

    constructor(id: Number, nome: String, ingredientes: Ingredientes[], valorSanduiche: Number) {
        this.id = id;
        this.nome = nome;
        this.ingredientes = ingredientes;
        this.valorSanduiche = valorSanduiche;
    }
}
