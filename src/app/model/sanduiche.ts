import { Ingredientes } from "./ingredientes";

export class Sanduiche {

    public id: Number
    public nomeSanduiche: String ;
    public ingredientes : Ingredientes[];
    public valorSanduiche: Number;

    constructor(id: Number, nomeSanduiche: String, ingredientes: Ingredientes[], valorSanduiche: Number) {
        this.id = id;
        this.nomeSanduiche = nomeSanduiche;
        this.ingredientes = ingredientes;
        this.valorSanduiche = valorSanduiche;
    }
}
