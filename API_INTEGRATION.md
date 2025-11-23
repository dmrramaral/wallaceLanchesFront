# API Integration Documentation

This document describes how the Wallace Lanches frontend integrates with the backend API.

## Backend Documentation

The backend API documentation is available at:
https://github.com/dmrramaral/marketPlace/blob/main/BACKEND_DOCUMENTATION.md

## Configuration

### Environment Setup

The frontend is configured to communicate with the backend through a proxy. Configuration files:

- **Environment**: `src/environments/environments.ts`
- **Proxy**: `proxy.conf.js`

```typescript
// src/environments/environments.ts
export const environment = {
    production: false,
    public_api: '/api',
    administrador_api: '/api',
    auth_api: '/api/auth',
};
```

```javascript
// proxy.conf.js
const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:3000',  // Backend URL
        secure: false,
        logLevel: 'debug',
        changeOrigin: true
    }
];
```

### Starting the Application

To run the frontend with the proxy configuration:

```bash
npm start
# or
ng serve --proxy-config proxy.conf.js
```

The frontend will be available at `http://localhost:4200` and will proxy API requests to `http://localhost:3000`.

## Available Services

### 1. AuthService

**Location**: `src/app/core/services/auth.service.ts`

Handles user authentication and authorization using JWT tokens.

**Methods**:
- `login(credentials: LoginRequest): Observable<LoginResponse>` - Authenticate user
- `logout(): void` - End user session
- `isAuthenticated(): boolean` - Check if user is authenticated
- `isAdmin(): boolean` - Check if user has admin privileges
- `getToken(): string | null` - Get JWT token
- `getCurrentUser(): any` - Get current user from memory
- `getCurrentUserFromBackend(): Observable<any>` - Fetch current user from backend
- `refreshToken(): Observable<LoginResponse>` - Refresh JWT token

**Example Usage**:
```typescript
constructor(private authService: AuthService) {}

login() {
  this.authService.login({ email: 'user@example.com', password: 'password123' })
    .subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Token is automatically stored
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
}
```

### 2. CategoryService

**Location**: `src/app/core/services/category.service.ts`

Manages product categories.

**Methods**:
- `listar(page?: number, limit?: number): Observable<Category[]>` - List all categories
- `buscarPorId(id: string): Observable<Category>` - Get category by ID
- `criar(category): Observable<Category>` - Create new category (admin only)
- `atualizar(id: string, category): Observable<Category>` - Update category (admin only)
- `deletar(id: string): Observable<any>` - Delete category (admin only)

**Example Usage**:
```typescript
constructor(private categoryService: CategoryService) {}

loadCategories() {
  this.categoryService.listar(1, 50).subscribe({
    next: (categories) => {
      console.log('Categories:', categories);
    },
    error: (error) => {
      console.error('Error loading categories', error);
    }
  });
}

createCategory() {
  this.categoryService.criar({ name: 'Lanches', description: 'Hambúrgueres e sanduíches' })
    .subscribe({
      next: (category) => {
        console.log('Category created:', category);
      }
    });
}
```

### 3. CartService

**Location**: `src/app/core/services/cart.service.ts`

Manages shopping cart operations.

**Methods**:
- `buscarCarrinho(): Observable<Cart>` - Get current user's cart
- `listarTodos(page?: number, limit?: number): Observable<Cart[]>` - List all carts (admin only)
- `adicionarProdutos(request: AddToCartRequest): Observable<Cart>` - Add products to cart
- `removerProduto(request: RemoveFromCartRequest): Observable<Cart | null>` - Remove product from cart
- `atualizarQuantidade(request: UpdateCartQuantityRequest): Observable<Cart>` - Update product quantity
- `realizarPagamento(request: PayCartRequest): Observable<Cart>` - Process cart payment

**Example Usage**:
```typescript
constructor(private cartService: CartService) {}

addToCart(productId: string, quantity: number) {
  this.cartService.adicionarProdutos({
    products: [{ _id: productId, quantity: quantity }]
  }).subscribe({
    next: (cart) => {
      console.log('Product added to cart:', cart);
    },
    error: (error) => {
      console.error('Error adding to cart', error);
    }
  });
}

updateQuantity(productId: string, quantity: number) {
  this.cartService.atualizarQuantidade({ productId, quantity })
    .subscribe({
      next: (cart) => {
        console.log('Quantity updated:', cart);
      }
    });
}
```

### 4. OrderService

**Location**: `src/app/core/services/order.service.ts`

Manages customer orders.

**Methods**:
- `criarPedidoDoCarrinho(): Observable<Order>` - Create order from current cart
- `listarMeusPedidos(page?: number, limit?: number): Observable<Order[]>` - List user's orders
- `buscarPorId(id: string): Observable<Order>` - Get order by ID
- `listarTodos(page?: number, limit?: number): Observable<Order[]>` - List all orders (admin only)
- `atualizarStatus(id: string, request): Observable<Order>` - Update order status (admin only)
- `deletar(id: string): Observable<any>` - Delete order (admin only)

**Example Usage**:
```typescript
constructor(private orderService: OrderService) {}

createOrder() {
  this.orderService.criarPedidoDoCarrinho().subscribe({
    next: (order) => {
      console.log('Order created:', order);
    },
    error: (error) => {
      console.error('Error creating order', error);
    }
  });
}

loadMyOrders() {
  this.orderService.listarMeusPedidos(1, 20).subscribe({
    next: (orders) => {
      console.log('My orders:', orders);
    }
  });
}

updateOrderStatus(orderId: string, status: string) {
  this.orderService.atualizarStatus(orderId, { status })
    .subscribe({
      next: (order) => {
        console.log('Order status updated:', order);
      }
    });
}
```

### 5. ProdutosService

**Location**: `src/app/administrador/produtos/produtos.service.ts`

Manages products (CRUD operations).

**Methods**:
- `listar(page?: number, limit?: number): Observable<Produto[]>` - List all products
- `buscarPorId(id: string | number): Observable<Produto>` - Get product by ID
- `adicionar(produto: Produto): Observable<Produto>` - Create new product (admin only)
- `atualizar(produto: Produto): Observable<Produto>` - Update product (admin only)
- `remover(produto: Produto): Observable<any>` - Delete product (admin only)
- `listarIngredientes(): Observable<Ingredientes[]>` - List available ingredients

**Example Usage**:
```typescript
constructor(private produtosService: ProdutosService) {}

loadProducts() {
  this.produtosService.listar(1, 100).subscribe({
    next: (products) => {
      console.log('Products:', products);
    }
  });
}

addProduct(product: Produto) {
  this.produtosService.adicionar(product).subscribe({
    next: (product) => {
      console.log('Product created:', product);
    }
  });
}
```

### 6. PublicService

**Location**: `src/app/public/public.service.ts`

Public-facing product listing (no authentication required).

**Methods**:
- `listar(page?: number, limit?: number): Observable<Produto[]>` - List all products

**Example Usage**:
```typescript
constructor(private publicService: PublicService) {}

loadPublicProducts() {
  this.publicService.listar(1, 100).subscribe({
    next: (products) => {
      console.log('Public products:', products);
    }
  });
}
```

### 7. CadastroService

**Location**: `src/app/public/cadastro/cadastro.service.ts`

User registration.

**Methods**:
- `cadastrar(cliente: Cliente): Observable<any>` - Register new user

**Example Usage**:
```typescript
constructor(private cadastroService: CadastroService) {}

register(userData: Cliente) {
  this.cadastroService.cadastrar(userData).subscribe({
    next: (response) => {
      console.log('User registered:', response);
    },
    error: (error) => {
      console.error('Registration failed', error);
    }
  });
}
```

## Data Models

### Produto (Product)
```typescript
interface Produto {
    _id?: string;           // MongoDB ID
    id?: Number;            // Legacy compatibility
    name?: string;          // Backend field
    nome?: String;          // Frontend field
    description?: string;   // Backend field
    descricao?: String;     // Frontend field
    price?: number;         // Backend field
    valor?: Number;         // Frontend field
    category?: string;      // Backend field (category ID)
    categoria?: Categoria;  // Frontend field (enum)
    imageUrl?: string;
    ingredients?: string[]; // Backend field (ingredient IDs)
    ingredientes?: Ingredientes[]; // Frontend field
    isAvailable?: boolean;
    discount?: number;
    createdAt?: string;
    updatedAt?: string;
}
```

### Category
```typescript
interface Category {
    _id: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}
```

### Cart
```typescript
interface Cart {
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

interface CartProduct {
    _id: string;
    quantity: number;
    addedAt?: string;
}
```

### Order
```typescript
interface Order {
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

interface OrderItem {
    product: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}
```

## Authentication

All authenticated requests automatically include the JWT token via the `AuthInterceptor`.

The interceptor adds the `Authorization: Bearer <token>` header to all API requests except public endpoints.

### Protected Routes

Routes are protected using guards:
- `authGuard` - Requires authentication
- `adminGuard` - Requires authentication and admin role
- `publicOnlyGuard` - Only accessible when not authenticated

## Error Handling

Services return RxJS Observables. Handle errors using the `error` callback:

```typescript
this.someService.someMethod().subscribe({
  next: (data) => {
    // Handle success
  },
  error: (error) => {
    console.error('Error:', error);
    // Handle error appropriately
    if (error.status === 401) {
      // Unauthorized - redirect to login
    } else if (error.status === 403) {
      // Forbidden - user doesn't have permission
    } else if (error.status === 404) {
      // Not found
    }
  }
});
```

## Pagination

Many list endpoints support pagination:

```typescript
// page: 1-based page number
// limit: number of items per page
this.productService.listar(1, 20).subscribe({...});
```

## Testing the Integration

### Prerequisites
1. Backend server running at `http://localhost:3000`
2. Frontend development server running with proxy

### Testing Steps

1. **Start the backend** (from the marketPlace repository)
2. **Start the frontend**:
   ```bash
   npm start
   ```
3. **Test public endpoints**:
   - Navigate to `/cardapio` to see products (no auth required)
4. **Test authentication**:
   - Navigate to `/cadastro` to register a new user
   - Navigate to `/login` to authenticate
5. **Test protected endpoints**:
   - After login, navigate to `/admin/produtos` to manage products (requires admin)

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the backend has the frontend URL in its CORS configuration:
```javascript
// Backend .env file
FRONTEND_URL=http://localhost:4200
```

### Proxy Not Working
1. Ensure you're starting the app with `npm start` or `ng serve --proxy-config proxy.conf.js`
2. Check that the proxy target in `proxy.conf.js` matches your backend URL
3. Restart the development server after changing proxy configuration

### Authentication Issues
1. Check that tokens are being stored in localStorage
2. Verify the AuthInterceptor is properly configured
3. Check browser console for 401/403 errors
4. Verify the backend JWT_SECRET matches between frontend and backend expectations

## API Endpoints Summary

### Public (No Authentication)
- `GET /api/product/products` - List products
- `GET /api/product/products/:id` - Get product by ID
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Authenticated (User)
- `GET /api/auth/me` - Get current user
- `GET /api/cart/cart` - Get user's cart
- `POST /api/cart/carts/products` - Add to cart
- `PUT /api/cart/carts/products` - Update cart quantity
- `DELETE /api/cart/carts/products` - Remove from cart
- `POST /api/cart/pay` - Pay cart
- `POST /api/order/from-cart` - Create order
- `GET /api/order/my` - List user's orders
- `GET /api/order/my/:id` - Get order by ID

### Admin Only
- `GET /api/category/categories` - List categories
- `POST /api/category/categories` - Create category
- `PUT /api/category/categories/:id` - Update category
- `DELETE /api/category/categories/:id` - Delete category
- `POST /api/product/products` - Create product
- `PUT /api/product/products/:id` - Update product
- `DELETE /api/product/products/:id` - Delete product
- `GET /api/cart/carts` - List all carts
- `GET /api/order/all` - List all orders
- `PUT /api/order/:id/status` - Update order status
- `DELETE /api/order/:id` - Delete order

---

**Last Updated**: 2025-11-23
