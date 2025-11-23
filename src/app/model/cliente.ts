
export interface Cliente {
    _id?: string; // MongoDB ID
    nome?: String | undefined;
    name?: string; // Backend uses 'name'
    telefone?: String | undefined;
    phone?: string; // Backend uses 'phone'
    cpf?: String | undefined;
    email?: String | undefined;
    password?: String | undefined;
    role?: string; // Backend includes role
    isAdmin?: boolean;
    createdAt?: string;
    updatedAt?: string;
}