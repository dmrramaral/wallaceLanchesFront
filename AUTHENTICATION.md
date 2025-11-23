# Guia de Autenticação JWT - Wallace Lanches Front

## Visão Geral

Este guia documenta o sistema de autenticação JWT implementado no Wallace Lanches Front, que protege rotas administrativas e gerencia o acesso de usuários.

## Arquitetura do Sistema de Autenticação

### Componentes Principais

#### 1. AuthService (`src/app/core/services/auth.service.ts`)

Serviço principal que gerencia toda a lógica de autenticação:

**Principais Métodos:**
- `login(credentials)`: Autentica usuário e armazena tokens
- `logout()`: Remove tokens e redireciona para login
- `isAuthenticated()`: Verifica se o usuário está autenticado
- `isAdmin()`: Verifica se o usuário tem permissões de administrador
- `getToken()`: Retorna o token JWT atual
- `refreshToken()`: Renova o token expirado

**Armazenamento:**
- Token JWT: `localStorage['auth_token']`
- Refresh Token: `localStorage['refresh_token']`
- Dados do Usuário: `localStorage['user_data']`

**Observable de Estado:**
```typescript
authService.currentUser$.subscribe(user => {
  // Reage a mudanças no estado do usuário
});
```

#### 2. Guards de Rota

**authGuard** - Protege rotas que requerem autenticação
```typescript
{
  path: 'perfil',
  component: PerfilComponent,
  canActivate: [authGuard]
}
```

**adminGuard** - Protege rotas administrativas
```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/...'),
  canActivate: [authGuard, adminGuard]
}
```

**publicOnlyGuard** - Rotas apenas para não-autenticados
```typescript
{
  path: 'login',
  component: LoginComponent,
  canActivate: [publicOnlyGuard]
}
```

#### 3. HTTP Interceptor

O `authInterceptor` adiciona automaticamente o header Authorization em todas as requisições:

```typescript
Authorization: Bearer <token>
```

**Endpoints Públicos (sem token):**
- `/auth/login`
- `/auth/register`
- `/cliente`

**Tratamento de Erros:**
- Erros 401 (Unauthorized) → Logout automático

## Fluxo de Autenticação

### 1. Login
```
Usuário → LoginComponent → AuthService.login() → API
   ↓
Recebe Token JWT
   ↓
Armazena em localStorage
   ↓
Redireciona baseado em permissões:
   - Admin → /admin
   - Usuário → returnUrl ou /
```

### 2. Acesso a Rota Protegida
```
Usuário acessa /admin → authGuard → adminGuard
   ↓
Verifica isAuthenticated()
   ↓
   Sim → Verifica isAdmin()
      ↓
      Sim → Permite acesso
      Não → Redireciona para /
   Não → Redireciona para /login?returnUrl=/admin
```

### 3. Requisição HTTP com Token
```
HTTP Request → authInterceptor
   ↓
Adiciona Authorization header com token
   ↓
Envia para API
   ↓
Se 401 → Logout automático
```

## Integração com Backend

### Endpoints Esperados

**POST /api/auth/login**
```json
Request:
{
  "email": "usuario@example.com",
  "password": "senha123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@example.com",
    "role": "admin" // ou isAdmin: true
  }
}
```

**POST /api/auth/refresh**
```json
Request:
{
  "refreshToken": "refresh_token_here"
}

Response:
{
  "token": "new_jwt_token",
  "refreshToken": "new_refresh_token"
}
```

### Estrutura do Token JWT

O token deve conter pelo menos:
```json
{
  "sub": "user_id",
  "email": "usuario@example.com",
  "role": "admin",
  "exp": 1735000000  // Timestamp de expiração
}
```

## Uso no Frontend

### Exemplo: Verificar se Usuário está Logado

**No Componente:**
```typescript
import { AuthService } from 'src/app/core/services/auth.service';

export class MeuComponent {
  constructor(public authService: AuthService) {}
  
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
```

**No Template:**
```html
<div *ngIf="authService.isAuthenticated()">
  Bem-vindo, {{ authService.getCurrentUser()?.name }}
</div>

<button *ngIf="authService.isAdmin()">
  Acesso Admin
</button>
```

### Exemplo: Fazer Login Programaticamente

```typescript
import { AuthService } from 'src/app/core/services/auth.service';

export class LoginComponent {
  constructor(private authService: AuthService) {}
  
  login() {
    this.authService.login({
      email: 'user@example.com',
      password: 'password123'
    }).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        // Redirecionar usuário
      },
      error: (error) => {
        console.error('Erro no login:', error);
      }
    });
  }
}
```

### Exemplo: Fazer Logout

```typescript
logout() {
  this.authService.logout();
  // Usuário é redirecionado automaticamente para /login
}
```

## Segurança

### Boas Práticas Implementadas

1. **Validação de Expiração**: Tokens expirados são automaticamente invalidados
2. **Logout em 401**: Sessões inválidas resultam em logout automático
3. **Guards de Rota**: Múltiplas camadas de proteção
4. **Interceptor Automático**: Token adicionado automaticamente em requisições
5. **Armazenamento Seguro**: localStorage com chaves específicas
6. **Verificação de Permissões**: Controle de acesso baseado em roles

### Considerações de Segurança

⚠️ **Importantes:**
- Tokens são armazenados em localStorage (vulnerável a XSS)
- Para produção, considere usar httpOnly cookies
- HTTPS é obrigatório em produção
- Implemente rate limiting no backend
- Use senhas fortes e hash bcrypt no backend

### Refresh Token

O sistema suporta refresh tokens para renovação automática:
```typescript
this.authService.refreshToken().subscribe({
  next: (response) => {
    console.log('Token renovado!');
  },
  error: (error) => {
    console.error('Erro ao renovar token:', error);
    this.authService.logout();
  }
});
```

## Testes

### Testar Autenticação Localmente

1. **Sem Backend Real:**
```typescript
// Mock do serviço em testes
TestBed.configureTestingModule({
  providers: [
    { provide: AuthService, useValue: mockAuthService }
  ]
});
```

2. **Com Backend de Desenvolvimento:**
Configure o proxy em `proxy.conf.js`:
```javascript
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false
  }
}
```

## Troubleshooting

### Problema: "No provider for HttpClient"
**Solução:** Certifique-se de que `provideHttpClient()` está no app.module.ts

### Problema: Token não sendo enviado
**Solução:** Verifique se a URL não está na lista de endpoints públicos

### Problema: Redirecionamento infinito
**Solução:** Verifique a lógica dos guards e certifique-se de que as rotas públicas estão corretas

### Problema: Logout automático constante
**Solução:** Verifique a data de expiração do token no backend

## Melhorias Futuras

- [ ] Implementar renovação automática de token
- [ ] Migrar de localStorage para httpOnly cookies
- [ ] Adicionar 2FA (Two-Factor Authentication)
- [ ] Implementar "Lembrar-me" com refresh token de longa duração
- [ ] Adicionar histórico de sessões
- [ ] Implementar logout de todos os dispositivos
- [ ] Adicionar logs de auditoria de autenticação

## Referências

- [Angular Security Best Practices](https://angular.dev/best-practices/security)
- [JWT.io - Introduction to JSON Web Tokens](https://jwt.io/introduction)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
