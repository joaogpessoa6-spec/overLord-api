const express = require('express');
const app = express();

app.use(express.json());

// "Banco de dados" fake
let personagens = [
  { id: 1, nome: "Ainz Ooal Gown", cargo: "Rei Feiticeiro" },
  { id: 2, nome: "Albedo", cargo: "Guardião Supervisor" },
  { id: 3, nome: "Shalltear Bloodfallen", cargo: "Guardião de Andar" }
];

// GET - listar todos
app.get('/personagens', (req, res) => {
  res.json(personagens);
});

// GET - buscar por ID
app.get('/personagens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const personagem = personagens.find(p => p.id === id);

  if (!personagem) {
    return res.status(404).json({ mensagem: "Personagem não encontrado" });
  }

  res.json(personagem);
});

// POST - criar personagem
app.post('/personagens', (req, res) => {
  const novo = {
    id: personagens.length + 1,
    nome: req.body.nome,
    cargo: req.body.cargo
  };

  personagens.push(novo);
  res.status(201).json(novo);
});

// PUT - atualizar personagem
app.put('/personagens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const personagem = personagens.find(p => p.id === id);

  if (!personagem) {
    return res.status(404).json({ mensagem: "Personagem não encontrado" });
  }

  personagem.nome = req.body.nome || personagem.nome;
  personagem.cargo = req.body.cargo || personagem.cargo;

  res.json(personagem);
});

// DELETE - remover personagem
app.delete('/personagens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  personagens = personagens.filter(p => p.id !== id);

  res.json({ mensagem: "Personagem removido" });
});

// Servidor
app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});