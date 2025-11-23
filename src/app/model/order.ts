export interface OrderItem {
    product: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export interface Order {
    _id: string;
    user: string | any;
    items: OrderItem[];
    subtotal: number;
    frete: number;
    total: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'failed';
    paymentMethod?: string;
    paidAt?: string;
    notes?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface UpdateOrderStatusRequest {
    status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
}
