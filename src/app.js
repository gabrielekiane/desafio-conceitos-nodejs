const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const likes = 0;
  const repositorie = { id: uuid(), title, url, techs, likes }

  repositories.push(repositorie);

  //irei exibir o projeto recém criado, e não a lista toda
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  // irei 'varrer' todos os repos para ver se a posição do id do projeto é igual ao recebido
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json('Project not found, sorry');
  }

  //criando um novo array do repo para poder substituir o antigo
  const likes = repositories[repositorieIndex].likes;
  const repositorie = {
    id, 
    title,
    url,
    techs,
    likes
  }

  repositories[repositorieIndex] = repositorie;

  // retornando o repositório atualizado:
  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json('Project not found, sorry');
  }

  //splice - retira info de um array
  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;
  const repositorie = repositories.find(repositorie => repositorie.id === id);

  if (!repositorie) {
    return response.status(400).json('Project not found, sorry');
  }

  repositorie.likes += 1

  //irei exibir o projeto recém criado, e não a lista toda
  return response.json(repositorie);
});

module.exports = app;
