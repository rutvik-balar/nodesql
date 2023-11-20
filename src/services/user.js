const { getUserRepo, createUserRepo, updateUserRepo, deleteUserRepo, getUserByCredentialRepo } = require('../repositoies/user.repo');
const jwt = require('jsonwebtoken');

const getUserServices = async (userId) => {
    const data = await getUserRepo(userId);
    if (!(data?.length)) {
        throw new Error('DATA_NOT_FOUND')
    } else {
        return data;
    }
};

const createUserServices = async (name, email, password) => {
    const isUserPresent = await getUserByCredentialRepo(email, password);
    if (isUserPresent.length) {
        throw new Error('USER_EXISTED')
    } else {
        const data = await createUserRepo(name, email, password)
        return;
    }
};

const updateUserServices = async (name, email, password, userId) => {
    const user = await getUserRepo(userId)
    const isIdPresent = user.some(item => item.id === userId);
    if (isIdPresent) {
        const isUserPresent = await getUserByCredentialRepo(email, password);
        if (isUserPresent.length) {
            throw new Error('USER_EXISTED')
        }
        else {
            await updateUserRepo(name, email, password, userId)
        }
    }
    else {
        throw new Error('DATA_NOT_FOUND')
    }
};

const deleteUserServices = async (userId) => {
    const user = await getUserRepo(userId)
    const isIdPresent = user.some(item => item.id === userId);
    if (isIdPresent) {
        const data = await deleteUserRepo(userId)
    } else {
        throw new Error('DATA_NOT_FOUND')
    }
};

const loginUserServices = async (Email, Password) => {
    const rows = await getUserByCredentialRepo(Email, Password);
    if (rows.length === 0) {
        throw new Error('INVALID_CREDENTIALS')
    } else {
        const token = jwt.sign({ id: rows[0].id, role: rows[0].created_by }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token;
    }
};



module.exports = { getUserServices, createUserServices, updateUserServices, deleteUserServices, loginUserServices };
