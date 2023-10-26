const express = require("express");
const server = express();

server.use(express.json());

const projetos = [];


//Checa se o projeto existe
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const projeto = projetos.find((p) => p.id == id);

  if (!projeto) {
    return res.status(400).json({ error: "Projeto não encontrado" });
  }

  return next();
}


//Contagem de requisições
function logRequests(req, res, next) {
  console.count("Número de requisições");
  return next();
}

server.use(logRequests);


//Criar projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const projeto = {
    id,
    title,
    tasks: [],
  };

  projetos.push(projeto);
  return res.json(projetos);
});


//Listar projetos e tarefas
server.get("/projects", (req, res) => {
  return res.json(projetos);
});


//Criar tarefas para um projeto
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projeto = projetos.find((p) => p.id == id);
  projeto.tasks.push(title);

  return res.json(projeto);
});


//Editar projetos (título)
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projeto = projetos.find((p) => p.id == id);
  projeto.title = title;

  return res.json(projeto);
});


//Deletar projetos
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  projetos.splice(id - 1, 1);
  return res.send();
});

server.listen(3000);
