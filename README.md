## ⚙️ Clonar o Repositório

```
git clone https://github.com/kaoosz/teddy.git
```
🔧 Configuração do Ambiente

os projetos rodam nas portas 3000,3001,4000  e os bancos 5432,5433:
```
cd teddy
cd docs
npm install
cd ..
vai no users-service cria .env na raiz do users-service e copia o codigo do .env.example
npm install
cd ..
vai no url-service cria .env na raiz do url-service e copia o codigo do .env.example
npm install
cd ..
depois de installar todas dependencias das pastas docs,users-service,url-service
agora é rodar o docker

```
🚀 Rodar a Aplicação
Via Docker Compose
```
docker-compose up --build
```

  
Acesso ao Swagger

Utilize a documentação Swagger para testar os endpoints:
```
http://localhost:4000/docs
```
Caso não consiga, os endpoints estão descritos abaixo.  

📄 Endpoints
👤 User Endpoints
Criar Usuário (POST)

Rota: POST http://localhost:3001/users
Regras:

    Forneça name,email,password obrigatório.

Exemplo de Request:
```
{
    "name": "gui",
    "email": "gui22@gmail.com",
    "password": "123456"
}
```



```
🔑 Login Endpoint
Login (POST)

Rota: POST http://localhost:3001/auth/login

Exemplo de Request:
```
{
    "email": "guitester@gmail.com",
    "password": "gui"
}
```
Exemplo de Resposta:
```
{
    "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
🌍 Url Endpoints
Criar Url (POST)

Rota: POST  http://localhost:3000/url
Regras:

    não É necessário fornecer um token JWT para autenticação.
    porém fornecendo token a url é criada vincula ao seu user_id

Exemplo de Request:
```
{
  "url": "https://www.google.com/"
}
```
Buscar minhas urls (GET)

Rota: GET http://localhost:3000/urls  

Descrição: retorna todas suas urls cadastradas.
É necessário fornecer um token JWT para autenticação.

```
Exemplo de Resposta:
```
{
 [
  {
    "id": 73,
    "original_url": "https://www.youtube.com/",
    "short_url": "http://localhost:3000/xspJ8RP",
    "user_id": 2,
    "click_count": 16,
    "created_at": "2025-01-12T19:29:37.603Z",
    "updated_at": "2025-01-12T19:30:34.460Z",
    "deleted_at": null,
    "_count": {
      "clicks": 16
    }
  ]
}
```

```
Atualizar Usuário (PUT)

Rota: PUT http://localhost:3000/urls/2
Regras:

    É necessário estar autenticado e fornecer o token JWT.
    O usuário só pode atualizar suas url.

Exemplo de Request:
```
{
  "url": "https://www.youtube.com/"
}
```
Exemplo de Resposta:
```
{
  "id": 73,
  "original_url": "https://www.youtube.com/",
  "short_url": "http://localhost:3000/xspJ8RP",
  "user_id": 2,
  "click_count": 16,
  "created_at": "2025-01-12T19:29:37.603Z",
  "updated_at": "2025-01-13T05:36:39.222Z",
  "deleted_at": null
}
```
Deleter Url (DELETE)

Rota: DELETE  http://localhost:3000/urls/15
Regras:

    É necessário estar autenticado e fornecer o token JWT.
    O usuário só pode deletar suas url.

Exemplo de Request:
```
{
   http://localhost:3000/urls/15
}
```
Exemplo de Resposta:
```
{
  "id": 83,
  "original_url": "https://www.google.com/",
  "short_url": "http://localhost:3000/WGRA2dd",
  "user_id": 2,
  "click_count": 0,
  "created_at": "2025-01-13T05:41:39.745Z",
  "updated_at": "2025-01-13T05:41:45.413Z",
  "deleted_at": "2025-01-13T05:41:45.413Z"
}
```
Redirecionamento para url original (GET)

Rota: GET http://localhost:3000/xspJ8RP

OBSERVAÇÂO

faltou o endpoint de redirecionamento direto no Swagger,
a UI dele não deixa o cors redirecionar então não deixei exposto lá.
mas aqui

Regras:
  qualquer um que acessar vai ser redirecionado para a url de origem direto.

Exemplo de Request:
```
{
  GET http://localhost:3000/xspJ8RP
}
