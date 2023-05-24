require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class UserController {

    static showRegisterInterface(req, res) {
        res.status(200);
        res.render('auth/register');
    }

    static async register(req, res) {
        const { email, password, confirmpassword } = req.body;

        //encrypting password
        const salt = bcrypt.genSaltSync(12);
        const passwordHash = await bcrypt.hashSync(password, salt);

        /* validations */

        if (!email) {
            req.flash('message', 'O email é obrigatório!');
            res.render('auth/register');
            return res.status(422);
        }

        if (!password) {
            req.flash('message', 'A senha é obrigatória!');
            res.render('auth/register');
            return res.status(422);
        }

        if (!confirmpassword) {
            req.flash('message', 'É preciso confirmar a sua senha!');
            res.render('auth/register');
            return res.status(422);
        }

        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem!');
            res.render('auth/register');
            return res.status(422);
        }

        if (password.length < 7) {
            req.flash('message', 'A senha deve ter no mínimo 7 caracteres');
            res.render('auth/register');
            return res.status(422);
        }

        const userExists = await User.findOne({ where: { email: email } });
        if (userExists) {
            req.flash('message', 'O email já foi registrado, tente novamente.');
            return res.status(422);
        }

        /* create user */
        try {

            const user = {
                email,
                password: passwordHash,
            }

            const createdUser = await User.create(user);

            /* initialize session */
            req.session.userid = createdUser.id;
            req.flash('message', 'Cadastro realizado com sucesso!');

            req.session.save(() => {
                res.status(201);
                res.redirect('/');
            });

        } catch (error) {
            console.log(error);
            req.flash('message', 'Ocorreu um erro no servidor, tente novamente mais tarde!');
            return res.status(500);
        }

    }

    static showLoginInterface(req, res) {
        res.status(200);
        res.render('auth/login');
    }

    static async login(req, res) {
        const { email, password } = req.body;

        /* validations */
        if (!email) {
            req.flash('message', 'O email é obrigatório!');
            res.render('auth/login');
            return res.status(422);
        }

        if (!password) {
            req.flash('message', 'A senha é obrigatória!');
            res.render('auth/login');
            return res.status(422);
        }

        /* check if user exists */
        const user = await User.findOne({where: { email: email }});
        if(!user) {
            req.flash('message', 'Usuário não encontrado');
            res.render('auth/login');
            return res.status(404);
        }

        /* check password */
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) {
            req.flash('message', 'Senha inválida');
            res.render('auth/login');
            return res.status(422);
        }

        try {
        
            /* initialize session */
            req.session.userid = user.id;
            req.flash('message', 'Login realizado com sucesso!');

            req.session.save(() => {
                res.status(201);
                res.redirect('/');
            });

        } catch (error) {
            console.log(error);
            req.flash('message', 'Ocorreu um erro no servidor, tente novamente mais tarde!');
            return res.status(500);
        }
    }

    static ShowLogoutInterface (req, res){
        res.status(200);
        res.render('auth/logout');
    }

    static logout (req, res) {
        req.session.destroy();
        res.redirect('/auth/login');
    }
}