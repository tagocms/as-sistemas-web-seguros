# as-sistemas-web-seguros

Projeto acadêmico da disciplina de Sistemas Web Seguros (PUCPR). Consiste em uma aplicação de gerenciamento de usuários com autenticação e autorização baseada em papéis (roles), dividida em um back-end (API REST) e um front-end (SPA).

## Visão geral

- **Back-end**: API REST em Java com Spring Boot, responsável por autenticação (JWT), cadastro de usuários e operações de CRUD sobre usuários, com controle de acesso por papel (`ADMIN`, `OPERATOR`, `CLIENT`).
- **Front-end**: Aplicação React (Create React App) que consome a API, com telas de login, cadastro, listagem de usuários, visualização/edição de um usuário e criação de novo usuário.

## Back-end

- **Stack**: Java 26, Spring Boot 4, Spring Security (JWT via `spring-security-oauth2-resource-server` + autenticação básica), Spring Data JDBC, banco H2 em memória.
- **Principais pacotes** (`back-end/src/main/java/santos/tiago/back_end`):
  - `controller`: endpoints REST (`AuthenticationController` para login/cadastro, `ApiController` para CRUD de usuários).
  - `service`: regras de negócio (`AuthenticationService`, `UserService`, `JWTService`, `UserDetailsServiceImplementation`).
  - `model`: entidades e DTOs (`User`, `UserRole`, `UserResponse`, `UserRoleRequest`, `UserAuthenticated`).
  - `repository`: acesso a dados (`UserRepository`).
  - `config`: configuração de segurança e CORS (`SecurityConfig`, `CorsConfig`).
  - `handler`: tratamento global de exceções (`GlobalExceptionHandler`).
- **Endpoints principais**:
  - `POST /cadastro` — cadastro de novo usuário (papel `CLIENT` por padrão).
  - `POST /autenticar` — autenticação (retorna token JWT).
  - `GET /api/usuarios` — lista usuários (requer permissão `read`).
  - `GET /api/usuarios/{username}` — detalhes de um usuário.
  - `POST /api/usuarios` — cria usuário (requer permissão `create`).
  - `PUT /api/usuarios/{username}` — atualiza o papel do usuário (requer permissão `update`).
  - `DELETE /api/usuarios/{username}` — remove usuário (requer permissão `delete`).
- Roda por padrão na porta `8080`.

## Front-end

- **Stack**: React 19, React Router 7, Axios, `jwt-decode`.
- **Estrutura** (`front-end/src`):
  - `elements/screens/Routes`: telas da aplicação (`Login`, `SignUp`, `Users`, `User`, `NewUser`).
  - `elements/components`: componentes reutilizáveis (`Header`, `LoginSignUpForm`).
  - `services`: `api.js` (cliente Axios apontando para `http://localhost:8080`), `authService.js` (gerenciamento do token/autenticação) e `translationService.js`.
  - `constants`: `endpoints.js` (endpoints da API) e `path.js` (rotas da aplicação).
  - `Navigator.jsx`: define as rotas e o controle de acesso conforme autenticação/escopo do usuário.
- Roda por padrão na porta `3001`.

## Como rodar o projeto

### Back-end (Maven)

Pré-requisitos: JDK 26+ instalado.

```bash
cd back-end

# rodar a aplicação
./mvnw spring-boot:run

# ou, alternativamente, gerar o pacote e executar o jar
./mvnw clean package
java -jar target/back-end-0.0.1-SNAPSHOT.jar
```

A API sobe em `http://localhost:8080`.

### Front-end (npm)

Pré-requisitos: Node.js e npm instalados.

```bash
cd front-end

# instalar as dependências
npm install

# rodar em modo desenvolvimento
npm start
```

A aplicação sobe em `http://localhost:3001` (configurado via variável `PORT` no script `start`).

> Certifique-se de que o back-end esteja rodando em `http://localhost:8080` antes de usar o front-end, já que ele consome a API nesse endereço.
