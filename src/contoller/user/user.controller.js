const db = require('../../helpers/dbConnection');
const { getUserRepo, createUserRepo, updateUserRepo, deleteUserRepo, getUserByCredentialRepo } = require('../../repositoies/user.repo');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    const userId = parseInt(req.query.id);
    try {
        const data = await getUserRepo(userId)
        if (data?.length) {
            res.status(200).json(data)
        } else {
            res.status(404).send("Data not found")
        }
    } catch (error) {
        console.error('Error inserting into the database: ' + error);
        res.status(500).send('Internal Server Error');
    }
};

const createUser = async (req, res) => {
    const { Name, Email, Password } = req.body;
    try {
        const isUserPresent = await getUserByCredentialRepo(Email, Password);
        if (isUserPresent.length) {
            res.send('User already existed');
        } else {
            const data = await createUserRepo(Name, Email, Password)
            const insertedId = data.insertId;
            res.json({ id: insertedId, message: 'User created successfully' });
        }
    } catch (error) {
        console.error('Error inserting into the database: ' + error.message);
        res.status(500).send('Internal Server Error');
    }
};

const updateUser = async (req, res) => {
    const userId = parseInt(req.query.id);
    const { Name, Email, Password } = req.body;
    try {
        const user = await getUserRepo(userId)
        const isIdPresent = user.some(item => item.id === userId);
        if (isIdPresent) {
            const isUserPresent = await getUserByCredentialRepo(Email, Password);
            if (isUserPresent.length) {
                res.send('User already existed');
            }
            else {
                const data = await updateUserRepo(Name, Email, Password, userId)
                res.json({ message: 'User updated successfully' });
            }
        }
        else {
            res.send("user not found")
        }
    } catch (error) {
        console.error('Error updating the user: ' + error.message);
        res.status(500).send('Internal Server Error');
    }
};

const deleteUser = async (req, res) => {
    const userId = parseInt(req.query.id);

    try {
        const user = await getUserRepo(userId)
        const isIdPresent = user.some(item => item.id === userId);
        if (isIdPresent) {
            const data = await deleteUserRepo(userId)
            res.json({ message: 'User marked as deleted' });
        } else {
            res.send("user not found")
        }

    } catch (error) {
        console.error('Error marking the user as deleted: ' + error.message);
        res.status(500).send('Internal Server Error');
    }
};

const loginUsers = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const rows = await getUserByCredentialRepo(Email, Password);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        } else {
            console.log(rows);
            const token = jwt.sign({id : rows[0].id}, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while logging in.' });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUsers };
