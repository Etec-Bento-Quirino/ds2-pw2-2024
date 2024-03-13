const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Dados de exemplo (simulando um banco de dados)
let data = [];

// Roteamento HTTP
app.get('/items', (req, res) => {
    res.json(data);
});

app.post('/items', (req, res) => {
    const newItem = req.body;
    data.push(newItem);
    res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    data[itemId] = updatedItem;
    res.json(updatedItem);
});

app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    data.splice(itemId, 1);
    res.sendStatus(204);
});

// Rota para servir a página HTML do front-end
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
