const express = require("express");
const server = express();

server.use(express.json());

//localhost:3000/teste
//req = Dados
//res = Informações de resposta

//Tipos de request
// Querry params = ?teste=1
// Route params = /users/1
// Request body = { "name":"Adonias", "email":"adoniasfalcao036@gmail.com" }

const users = ["Adonias", "Diego", "Dhenzel"];

//Middleware Global: Executa em qualquer requisição
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method} - Url: ${req.url}`);

  next(); //Segue para as próximas funções

  console.timeEnd("Request");
});


//Midleware local: Executa apenas onde for necessário
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User is required" });
  }

  return next();
}


function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User not exists" });
  }

  req.user = user;
  return next();
}


//Listagem de todos
server.get("/users", (req, res) => {
  return res.json(users);
});


//Listagem específica
server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});


//Criação de usuário
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});


//Alterar usuário
server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});


//Excluir usuário
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);
  return res.send();
});

server.listen(3333);
