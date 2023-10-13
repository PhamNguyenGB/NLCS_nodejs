import userService from '../service/userService'

// create the connection to database
const homePage = (req, res) => {
    return res.render('home.ejs');
}

const userPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render('users.ejs', { data: userList });
}

const handleCreateUser = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let phonenumber = req.body.phonenumber;
    let address = req.body.address;

    userService.createNewUser(email, username, password, phonenumber, address);

    return res.redirect('/user');
};

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect('/user');
};

const getUpdateUser = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = {};
    userData = user;
    return res.render('user-update.ejs', { data: userData });
};

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let address = req.body.address;
    let phone = req.body.phone;
    let id = req.body.id;
    await userService.updateUser(email, username, address, phone, id);
    return res.redirect('/user');
};

module.exports = {
    homePage,
    userPage,
    handleCreateUser,
    handleDeleteUser,
    getUpdateUser,
    handleUpdateUser,
}