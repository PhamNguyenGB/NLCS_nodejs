import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';
import db from '../models/index';
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db_medicine'
});

const funHashPassWord = (userPass) => {
    let hashPassword = bcrypt.hashSync(userPass, salt);
    return hashPassword;
};

const createNewUser = async (email, username, password, phone, address) => {
    let hashPass = funHashPassWord(password);

    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass,
            address: address,
            phone: phone
        });
    } catch (error) {
        console.log('check error', error);
    }
};

const getUserList = async () => {
    // let users = [];
    // users = await db.User.findAll();
    let user = await db.User.findAll({
        where: { id: 3 },
        include: db.Group,
        raw: true,
        nest: true
    });
    // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'db_medicine', Promise: bluebird});

    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user');
    //     return rows;
    // } catch(error) {
    //     console.log('check error', error);
    // }
    return users;
};

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    });
};

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    });
    return user.get({ plain: true });
};

const updateUser = async (email, username, address, phonenumber, id) => {
    await db.User.update(
        {
            email: email,
            username: username,
            address: address,
            phonenumber: phonenumber,
        },
        {
            where: { id: id },
        }
    );

};

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUser,
}
