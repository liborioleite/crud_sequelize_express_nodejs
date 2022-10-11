const { application } = require('express')
const express = require('express')
const app = express();
app.use(express.json());

const ClienteController = require('./controllers/clienteController');


app.get("/clients", ClienteController.index);

app.post("/clients", ClienteController.store);

app.get("/clients/:id", ClienteController.show);

app.put("/clients/:id", ClienteController.update);

app.delete("/clients/:id", ClienteController.destroy)

app.listen(3333);

