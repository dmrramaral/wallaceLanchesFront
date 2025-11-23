export interface CartProduct {
    _id: string;
    quantity: number;
    addedAt?: string;
}

export interface Cart {
    _id: string;
    user: string;
    products: CartProduct[];
    totalPrice: number;
    frete: number;
    paymentStatus: 'pending' | 'paid' | 'failed';
    paymentDetails?: {
        method: string;
        paidAt: string;
        transactionId: string;
    };
    createdAt: string;
    updatedAt?: string;
}

export interface AddToCartRequest {
    products: {
        _id: string;
        quantity: number;
    }[];
}

export interface UpdateCartQuantityRequest {
    productId: string;
    quantity: number;
}

export interface RemoveFromCartRequest {
    products: {
        _id: string;
    }[];
}

export interface PayCartRequest {
    paymentMethod: string;
    transactionId: string;
}
