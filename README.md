# Wallace Lanches Front

Sistema web para gestão de pedidos e cardápio da lanchonete Wallace Lanches, desenvolvido com **Angular 19**.

## 📋 Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Autenticação e Segurança](#autenticação-e-segurança)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Próximas Melhorias](#próximas-melhorias)

## 🎯 Sobre o Projeto

Aplicação frontend para gerenciamento de pedidos online da lanchonete Wallace Lanches. O sistema possui área pública para visualização do cardápio e cadastro de clientes, além de área administrativa protegida por autenticação JWT para gestão de produtos.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── core/                    # Módulo core com serviços essenciais
│   │   ├── guards/             # Guards de autenticação e autorização
│   │   │   └── auth.guard.ts   # authGuard, adminGuard, publicOnlyGuard
│   │   ├── interceptors/       # HTTP Interceptors
│   │   │   └── auth.interceptor.ts  # Interceptor JWT
│   │   └── services/           # Serviços essenciais
│   │       └── auth.service.ts # Serviço de autenticação JWT
│   ├── administrador/          # Módulo administrativo (protegido)
│   │   ├── administrador-routing/
│   │   └── produtos/           # Gerenciamento de produtos
│   │       └── cadastrar-produtos/
│   ├── public/                 # Módulo público
│   │   ├── cadastro/          # Cadastro de clientes
│   │   ├── cardapio/          # Visualização do cardápio
│   │   └── login/             # Autenticação com JWT
│   ├── header/                # Componente de cabeçalho
│   ├── footer/                # Componente de rodapé
│   ├── model/                 # Modelos de dados
│   │   ├── categoria.ts       # Enum de categorias
│   │   ├── cliente.ts         # Interface Cliente
│   │   ├── produto.ts         # Interface Produto
│   │   ├── ingredientes.ts    # Interface Ingredientes
│   │   └── tipoIngrediente.ts # Tipo de ingrediente
│   ├── app-routing.module.ts  # Roteamento principal com guards
│   └── currency-brl.pipe.ts   # Pipe para formatação BRL
├── assets/                    # Recursos estáticos
├── environments/              # Configurações de ambiente
└── styles.css                 # Estilos globais
```

## 🔧 Funcionalidades

### Área Pública
- **Página Inicial**: Apresentação da lanchonete
- **Cardápio**: Visualização dos produtos disponíveis com categorias:
  - Sanduíches
  - Bebidas
  - Sobremesas
  - Acompanhamentos
  - Promoções
  - Combos
- **Cadastro de Clientes**: Registro de novos usuários com:
  - Nome
  - Telefone
  - CPF
  - E-mail
  - Senha
- **Login**: Autenticação de usuários com JWT

### Área Administrativa (Protegida)
- **Dashboard**: Painel de controle administrativo
- **Gerenciamento de Produtos (CRUD completo)**:
  - Listar produtos
  - Cadastrar novos produtos
  - Editar produtos existentes
  - Remover produtos
  - Associar ingredientes aos produtos
  - Definir categorias e valores

### Componentes Reutilizáveis
- **Header**: Cabeçalho com navegação e logout
- **Footer**: Rodapé com informações da empresa
- **Currency BRL Pipe**: Formatação automática de valores em Real brasileiro

### Integrações
- **API REST**: Integração com backend através de proxy configurado
- **HttpClient**: Comunicação assíncrona com a API
- **RxJS**: Gerenciamento de operações assíncronas

## 🔐 Autenticação e Segurança

### Sistema JWT Implementado

O projeto utiliza **JSON Web Tokens (JWT)** para autenticação segura, seguindo as melhores práticas do mercado:

#### Guards de Rota

1. **authGuard**: Protege rotas que requerem autenticação
   - Verifica se o usuário está autenticado
   - Redireciona para login se não autenticado
   - Salva a URL de destino para redirecionamento após login

2. **adminGuard**: Protege rotas administrativas
   - Verifica autenticação E permissões de administrador
   - Redireciona usuários não-admin para página inicial
   - Redireciona usuários não-autenticados para login

3. **publicOnlyGuard**: Previne acesso de usuários autenticados a páginas públicas
   - Redireciona usuários já autenticados para área apropriada
   - Evita que usuários logados acessem login/cadastro

#### Interceptor HTTP

- **authInterceptor**: Adiciona automaticamente o token JWT em todas as requisições
  - Injeta header `Authorization: Bearer <token>` nas chamadas API
  - Intercepta erros 401 e realiza logout automático
  - Lista de endpoints públicos que não requerem token

#### Serviço de Autenticação

**AuthService** oferece:
- `login()`: Autenticação com email/senha
- `logout()`: Encerra sessão e limpa tokens
- `isAuthenticated()`: Verifica se usuário está autenticado
- `isAdmin()`: Verifica permissões de administrador
- `getToken()`: Recupera token JWT
- `refreshToken()`: Renova token expirado
- Decodificação e validação de tokens JWT
- Armazenamento seguro em localStorage

#### Rotas Protegidas

```typescript
// Rotas públicas
/ - Página inicial (todos)
/cardapio - Cardápio (todos)

// Rotas públicas exclusivas (não-autenticados)
/login - Login (publicOnlyGuard)
/cadastro - Cadastro (publicOnlyGuard)

// Rotas protegidas (autenticação + permissão admin)
/admin/** - Área administrativa (authGuard + adminGuard)
```

## ✔️ Tecnologias Utilizadas

### Framework e Bibliotecas
- **Angular 19.2.15** - Framework principal (atualizado de 15.2.0)
- **Angular Material 19.2.19** - Componentes UI
- **Bootstrap 5.3.0** - Framework CSS
- **RxJS 7.8.0** - Programação reativa

### Bibliotecas Adicionais
- **Font Awesome 6.4.0** - Ícones
- **jQuery 3.6.4** - Manipulação DOM
- **Popper.js 1.16.1** - Tooltips e popovers

### Ferramentas de Desenvolvimento
- **TypeScript 5.8.3** - Linguagem de programação (atualizado de 4.9.4)
- **Angular CLI 19.2.19** - Interface de linha de comando
- **Karma & Jasmine** - Testes unitários
- **VS Code** - Editor de código

### Build e Deploy
- **Vercel** - Plataforma de deploy (configurado via vercel.json)
- **Angular Build** - Sistema de build otimizado

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão recomendada: 18 ou superior)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

### Instalação
```bash
# Clone o repositório
git clone https://github.com/dmrramaral/wallaceLanchesFront.git

# Entre na pasta do projeto
cd wallaceLanchesFront

# Instale as dependências
npm install
```

### Executar em Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento com proxy
npm start

# Ou usando Angular CLI diretamente
ng serve --proxy-config proxy.conf.js

# Acesse: http://localhost:4200/
```

### Build para Produção
```bash
# Build otimizado para produção
npm run build

# Os arquivos serão gerados em dist/
```

### Executar Testes
```bash
# Executar testes unitários
npm test
```

## 🔄 Próximas Melhorias

### Funcionalidades
1. **Sistema de Pedidos Online**
   - Carrinho de compras
   - Finalização de pedidos
   - Acompanhamento de status do pedido
   - Histórico de pedidos

2. **Melhorias na Área Administrativa**
   - Dashboard com estatísticas e gráficos
   - Gerenciamento de pedidos em tempo real
   - Relatórios de vendas
   - Gestão de clientes

### Correções Técnicas
1. **Melhorar mensagens de ação do CRUD**
   - Implementar toasts/notificações de sucesso e erro
   - Validações mais robustas nos formulários

2. **Corrigir o Cadastro**
   - Evitar exposição de dados sensíveis no HTML
   - Implementar validação de CPF e e-mail
   - Hash de senhas antes do envio

3. **Ajustar responsividade**
   - Otimizar layout para dispositivos móveis
   - Melhorar experiência em tablets
   - Implementar menu hambúrguer em telas pequenas

4. **Melhorias no formulário de edição**
   - Pré-carregar corretamente os campos selecionados
   - Validação em tempo real
   - Feedback visual melhorado

### Novas Funcionalidades
5. **Sistema de Avaliações**
   - Avaliação de produtos
   - Comentários de clientes

6. **Integração de Pagamento**
   - Pagamento online (PIX, Cartão)
   - Confirmação automática de pagamento

7. **Notificações**
   - Push notifications para novos pedidos
   - E-mail de confirmação de cadastro
   - SMS para atualizações de pedido

8. **Otimizações**
   - Lazy loading de módulos
   - Service Workers para PWA
   - Cache de dados
   - Otimização de imagens

9. **Acessibilidade**
   - Melhorias de ARIA
   - Navegação por teclado
   - Contraste de cores

## 📝 Changelog

### v2.0.0 (2025-11-23)
- ✨ Atualização do Angular 15 para Angular 19
- ✨ Implementação de autenticação JWT
- ✨ Criação de guards para rotas públicas e privadas
- ✨ HTTP Interceptor para injeção automática de tokens
- ✨ Serviço de autenticação completo
- ✨ Atualização de todas as dependências para versões compatíveis
- ✨ Migração para TypeScript 5.8.3
- 🔒 Proteção de rotas administrativas
- 🔒 Sistema de logout automático em caso de token inválido

## 📝 Licença

Este projeto é de uso privado da empresa Wallace Lanches.

## 👥 Contribuidores

- **Desenvolvedor**: dmrramaral

---

**Desenvolvido com ❤️ para Wallace Lanches**


## 📋 Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Próximas Melhorias](#próximas-melhorias)

## 🎯 Sobre o Projeto

Aplicação frontend para gerenciamento de pedidos online da lanchonete Wallace Lanches. O sistema possui área pública para visualização do cardápio e cadastro de clientes, além de área administrativa para gestão de produtos.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── administrador/           # Módulo administrativo
│   │   ├── administrador-routing/
│   │   └── produtos/           # Gerenciamento de produtos
│   │       └── cadastrar-produtos/
│   ├── public/                 # Módulo público
│   │   ├── cadastro/          # Cadastro de clientes
│   │   ├── cardapio/          # Visualização do cardápio
│   │   └── login/             # Autenticação de usuários
│   ├── header/                # Componente de cabeçalho
│   ├── footer/                # Componente de rodapé
│   ├── model/                 # Modelos de dados
│   │   ├── categoria.ts       # Enum de categorias
│   │   ├── cliente.ts         # Interface Cliente
│   │   ├── produto.ts         # Interface Produto
│   │   ├── ingredientes.ts    # Interface Ingredientes
│   │   └── tipoIngrediente.ts # Tipo de ingrediente
│   ├── app-routing.module.ts  # Roteamento principal
│   └── currency-brl.pipe.ts   # Pipe para formatação BRL
├── assets/                    # Recursos estáticos
├── environments/              # Configurações de ambiente
└── styles.css                 # Estilos globais
```

## 🔧 Funcionalidades

### Área Pública
- **Página Inicial**: Apresentação da lanchonete
- **Cardápio**: Visualização dos produtos disponíveis com categorias:
  - Sanduíches
  - Bebidas
  - Sobremesas
  - Acompanhamentos
  - Promoções
  - Combos
- **Cadastro de Clientes**: Registro de novos usuários com:
  - Nome
  - Telefone
  - CPF
  - E-mail
  - Senha
- **Login**: Autenticação de usuários

### Área Administrativa
- **Dashboard**: Painel de controle administrativo
- **Gerenciamento de Produtos (CRUD completo)**:
  - Listar produtos
  - Cadastrar novos produtos
  - Editar produtos existentes
  - Remover produtos
  - Associar ingredientes aos produtos
  - Definir categorias e valores

### Componentes Reutilizáveis
- **Header**: Cabeçalho com navegação
- **Footer**: Rodapé com informações da empresa
- **Currency BRL Pipe**: Formatação automática de valores em Real brasileiro

### Integrações
- **API REST**: Integração com backend através de proxy configurado
- **HttpClient**: Comunicação assíncrona com a API
- **RxJS**: Gerenciamento de operações assíncronas

## ✔️ Tecnologias Utilizadas

### Framework e Bibliotecas
- **Angular 15.2.0** - Framework principal
- **Angular Material 15.2.9** - Componentes UI
- **Bootstrap 5.3.0** - Framework CSS
- **RxJS 7.8.0** - Programação reativa

### Bibliotecas Adicionais
- **Font Awesome 6.4.0** - Ícones
- **jQuery 3.6.4** - Manipulação DOM
- **Popper.js 1.16.1** - Tooltips e popovers

### Ferramentas de Desenvolvimento
- **TypeScript 4.9.4** - Linguagem de programação
- **Angular CLI 15.2.7** - Interface de linha de comando
- **Karma & Jasmine** - Testes unitários
- **VS Code** - Editor de código

### Build e Deploy
- **Vercel** - Plataforma de deploy (configurado via vercel.json)
- **Angular Build** - Sistema de build otimizado

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão recomendada: 14 ou superior)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

### Instalação
```bash
# Clone o repositório
git clone https://github.com/dmrramaral/wallaceLanchesFront.git

# Entre na pasta do projeto
cd wallaceLanchesFront

# Instale as dependências
npm install
```

### Executar em Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento com proxy
npm start

# Ou usando Angular CLI diretamente
ng serve --proxy-config proxy.conf.js

# Acesse: http://localhost:4200/
```

### Build para Produção
```bash
# Build otimizado para produção
npm run build

# Os arquivos serão gerados em dist/
```

### Executar Testes
```bash
# Executar testes unitários
npm test
```

## 🔄 Próximas Melhorias

### Funcionalidades
1. **Sistema de Pedidos Online**
   - Carrinho de compras
   - Finalização de pedidos
   - Acompanhamento de status do pedido
   - Histórico de pedidos

2. **Melhorias na Área Administrativa**
   - Dashboard com estatísticas e gráficos
   - Gerenciamento de pedidos em tempo real
   - Relatórios de vendas
   - Gestão de clientes

3. **Autenticação e Segurança**
   - Implementar JWT (JSON Web Tokens)
   - Guards para rotas protegidas
   - Diferentes níveis de permissão (Admin, Cliente)

### Correções Técnicas
1. **Melhorar mensagens de ação do CRUD**
   - Implementar toasts/notificações de sucesso e erro
   - Validações mais robustas nos formulários

2. **Corrigir o Cadastro**
   - Evitar exposição de dados sensíveis no HTML
   - Implementar validação de CPF e e-mail
   - Hash de senhas antes do envio

3. **Ajustar responsividade**
   - Otimizar layout para dispositivos móveis
   - Melhorar experiência em tablets
   - Implementar menu hambúrguer em telas pequenas

4. **Melhorias no formulário de edição**
   - Pré-carregar corretamente os campos selecionados
   - Validação em tempo real
   - Feedback visual melhorado

### Novas Funcionalidades
5. **Sistema de Avaliações**
   - Avaliação de produtos
   - Comentários de clientes

6. **Integração de Pagamento**
   - Pagamento online (PIX, Cartão)
   - Confirmação automática de pagamento

7. **Notificações**
   - Push notifications para novos pedidos
   - E-mail de confirmação de cadastro
   - SMS para atualizações de pedido

8. **Otimizações**
   - Lazy loading de módulos
   - Service Workers para PWA
   - Cache de dados
   - Otimização de imagens

9. **Acessibilidade**
   - Melhorias de ARIA
   - Navegação por teclado
   - Contraste de cores

## 📝 Licença

Este projeto é de uso privado da empresa Wallace Lanches.

## 👥 Contribuidores

- **Desenvolvedor**: dmrramaral

---

**Desenvolvido com ❤️ para Wallace Lanches**
