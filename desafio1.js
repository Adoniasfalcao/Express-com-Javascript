const express = require("express");
const server = express();

server.use(express.json());

//Crie um armazenador de projetos e de tarefas

const projetos = [{
    "id":"1",
    "title":"Teste",
    "tasks": []
}]


//Criar projeto
server.post("/projects", (req, res) => {
    const { id,title } = req.body;

    const projeto = {
        id,
        title,
        tasks: []
    }

    projetos.push(projeto);
  
    return res.json(projetos);
  });


//Listar projetos e tarefas
server.get("/projects", (req, res) => {
    return res.json(projetos);
  });

//Criar tarefas para um projeto



//Editar projetos (título)
server.put("projects/:id", (req, res) => {
    const { id } = req.params;
    const { title } = req.body

    const projeto = projetos.find( p => p.id == id)
    
    projeto.title = title

    return res.json(projeto)
})


//Deletar projetos
server.delete("/projects/:id", (req, res) => {
    const { id } = req.params;
  
    projetos.splice(id, 1);
    return res.send();
  });


server.listen(3000)