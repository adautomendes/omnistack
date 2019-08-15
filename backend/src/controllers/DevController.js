const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } }, //Usuários com id diferente do id do usuário logado
                { _id: { $nin: loggedDev.likes } }, //Removendo todos os Devs que ja deu like
                { _id: { $nin: loggedDev.dislikes } } //Removendo todos os Devs que ja deu dislike
            ],
        });

        return res.json(users);
    },

    async store(req, res) {
        //Desestruturação
        const { username } = req.body;

        //Buscando de ja existe user cadastrado
        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        //Desestruturação: renomeando o campo 'login' do response.data para 'user'
        const { name, login: user, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user,
            bio,
            avatar
        });

        return res.json(dev);
    }
};