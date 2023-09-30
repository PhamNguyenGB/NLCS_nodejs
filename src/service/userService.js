import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';

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

const createNewUser = async (email, username, password, phonenumber, address) => {
    let hashPass = funHashPassWord(password);

    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'db_medicine', Promise: bluebird});
    try {
        const [rows, fields] = await connection.execute('INSERT INTO users (email, username, password, phonenumber, address) VALUES (?, ?, ?, ?, ?)', [email, username, hashPass, phonenumber, address]);
        return rows;
    } catch(error) {
        console.log('check error', error);
    }
};

const getUserList = async () => {
    let users = [];

    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'db_medicine', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch(error) {
        console.log('check error', error);
    }
};

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'db_medicine', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?;', [id]);
    } catch(error) {
        console.log(error);
    }
};

const getUserById = async (id) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'db_medicine', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?;', [id]);
        return rows;
    } catch(error) {
        console.log('check error', error);
    }
};

const updateUser = async (email, username, address, phonenumber, id) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'db_medicine', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('UPDATE users SET email=?, username=?, phonenumber=?, address=? WHERE id=?', [email, username, phonenumber, address, id]);
        return rows;
    } catch(error) {
        console.log('check error', error);
    }
};

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUser,
}
