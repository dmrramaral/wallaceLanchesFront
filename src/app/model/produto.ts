import { Categoria } from "./categoria";
import { Ingredientes } from "./ingredientes";

export interface Produto {
    _id?: string; // MongoDB ID
    id?: Number; // Keep for compatibility
    name?: string; // Backend uses 'name'
    nome?: String; // Keep for compatibility
    description?: string; // Backend uses 'description'
    descricao?: String; // Keep for compatibility
    price?: number; // Backend uses 'price'
    valor?: Number; // Keep for compatibility
    category?: string; // Backend uses category ID
    categoria?: Categoria; // Keep for compatibility
    imageUrl?: string; // Backend includes imageUrl
    ingredients?: string[]; // Backend uses ingredient IDs
    ingredientes?: Ingredientes[]; // Keep for compatibility
    isAvailable?: boolean;
    discount?: number;
    createdAt?: string;
    updatedAt?: string;
}
