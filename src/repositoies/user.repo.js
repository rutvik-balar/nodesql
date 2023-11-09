
const db = require('../helpers/dbConnection');

const getUserRepo = async(id) =>{
    const [result] = await db.promise().query(`SELECT id,Name,Email,Password FROM data WHERE is_deleted = 0 ${id? 'AND id = ?' : ''}      `, [id]);
    return result
}

const createUserRepo = async(Name,Email,Password) =>{
    const [result] = await db.promise().query('INSERT INTO data (Name, Email, Password) VALUES (?, ?, ?)', [Name, Email, Password]);
    return result
}

const updateUserRepo = async(Name,Email,Password,userId) =>{
    const [result] = await db.promise().query('UPDATE data SET Name = ?, Email = ?, Password = ? WHERE id = ?', [Name, Email, Password, userId]);
    return result
}

const deleteUserRepo = async(userId) =>{
    const [result] = await db.promise().query('UPDATE data SET is_deleted = 1 WHERE id = ?', [userId]);
    return result
}

module.exports = {getUserRepo, createUserRepo, updateUserRepo, deleteUserRepo}