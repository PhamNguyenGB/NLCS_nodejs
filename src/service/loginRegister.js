import db from '../models/index'
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const funHashPassWord = (userPass) => {
    let hashPassword = bcrypt.hashSync(userPass, salt);
    return hashPassword;
};

const checkUsername = async (username) => {
    let user = await db.User.findOne({
        where: { username: username }
    });

    if (user) {
        return true;
    }
    return false;
};

const checkEmail = async (email) => {
    let user = await db.User.findOne({
        where: { email: email }
    });

    if (user) {
        return true;
    }
    return false;
};

const checkPhone = async (phone) => {
    let user = await db.User.findOne({
        where: { phone: phone }
    });

    if (user) {
        return true;
    }
    return false;
};

const checkInput = async (data) => {
    let user = await db.User.findOne({
        where: { data: data }
    });

    if (user) {
        return true;
    }
    return false;
};

const registerNewUser = async (userData) => {
    try {
        // Check username, email and phone
        let isUsernameExist = await checkUsername(userData.username);
        if (isUsernameExist === true) {
            return {
                EM: 'Tên tài khoản đã tồn tại',
                EC: 1,
                DT: 'isValidUsername',
            }
        }

        let isPhoneExits = await checkPhone(userData.phone);
        if (isPhoneExits === true) {
            return {
                EM: 'Số điện thoại đã được sử dụng',
                EC: 1,
                DT: 'isValidPhone'
            }
        }

        let isEmailExist = await checkEmail(userData.email);
        if (isEmailExist === true) {
            return {
                EM: 'Địa chỉ email đã tồn tại',
                EC: 1,
                DT: 'isValidEmail',
            }
        }

        // hash password
        let hashPassword = funHashPassWord(userData.password);

        // create new user
        await db.User.create({
            email: userData.email,
            username: userData.username,
            password: hashPassword,
            address: userData.address,
            phone: userData.phone,
            groupId: 0
        })

        return {
            EM: 'Tạo tài khoản thành công',
            EC: 0
        }

    } catch (error) {
        return {
            EM: 'Lỗi tạo tài khoản người dùng',
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    let check = bcrypt.compareSync(inputPassword, hashPassword);
    return check;
};

const handleUserLogin = async (data) => {
    try {
        // Check username, email and phone
        let user = await db.User.findOne({
            where: { username: data.username }
        })
        if (user) {
            let isCorrectPassword = await checkPassword(data.password, user.password);
            if (isCorrectPassword === true) {
                return {
                    EM: 'Đăng nhập thành công',
                    EC: 0,
                    DT: '',
                }
            }
        }
        return {
            EM: 'Tên tài khoản hoặc mật khẩu chưa chính xác',
            EC: 1,
            DT: '',
        }

    } catch (error) {
        return {
            EM: 'Lỗi Đăng nhập',
            EC: -2
        }
    }
};

module.exports = {
    registerNewUser,
    handleUserLogin,
}