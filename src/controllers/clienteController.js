const { response } = require('express');
const { json } = require('sequelize');
const { Clientes, Sequelize } = require('./../../models');


const index = async (req, res) => {
    console.log('Chegou no ClientesController Index');

    const clients = await Clientes.findAll();
    return res.json(clients);

}

const store = async (req, res) => {
    const { name, age, email } = req.body;

    const new_client = {
        name,
        age,
        email
    }

    const client = await Clientes.create(new_client);
    return res.json(client);
}

const show = async (req, res) => {

    const { id } = req.params;
    const client = await Clientes.findOne({ where: { id } })

    if (!client) {
        return res.status(404).json({ message: "Cliente não encontrado." })
    }
    return res.json(client)

}

const update = async (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const client = await Clientes.findOne({ where: { id } });

    

    if (!client) {
        return res.status(404).json({ message: "cliente não encontrado" })
    } else {
        const updated_client = await Clientes.update({ name, age, email }, { where: { id } })
        return res.status(200).json({ message: "Cliente atualizado com sucesso!" })
    }

}

const destroy = async (req, res) => {

    const { id } = req.params;
    const client = await Clientes.findOne({ where: { id } });

    if (!client) {
        return res.status(404).json({ message: "cliente não encontrado" })
    } else {
        await Clientes.destroy({ where: { id } });
        return res.status(204).json(true)
    }



}






module.exports = { index, store, show, update, destroy };