import { TipoIngrediente } from "./tipoIngrediente";

export class Ingredientes{
   
    public id: Number;
    public nomeIngrediente: String;
    public TipoIngrediente: TipoIngrediente;

    constructor(id: Number, nomeIngrediente: String, TipoIngrediente: TipoIngrediente){
        this.id = id;
        this.nomeIngrediente = nomeIngrediente;
        this.TipoIngrediente = TipoIngrediente;
    }


}