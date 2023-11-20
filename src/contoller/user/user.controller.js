const db = require('../../helpers/dbConnection');
const { getUserServices, createUserServices, updateUserServices, deleteUserServices, loginUserServices } = require('../../services/user')

const getUsers = async (req, res) => {
    const userId = req.data.id;
    try {
        const data = await getUserServices(userId);
        res.status(200).json(data)
    } catch (error) {
        switch (error.message) {
            case 'DATA_NOT_FOUND':
                res.status(404).send("Data not found");
                break;
            default:
                res.status(500).send('Internal Server Error');
        }
    }
};

const createUser = async (req, res) => {
    const { Name, Email, Password } = req.body;
    try {
        await createUserServices(Name, Email, Password);
        res.status(200).send({ message: 'User created successfully' })
    } catch (error) {
        switch (error.message) {
            case 'USER_EXISTED':
                res.status(409).send("User already existed");
                break;
            default:
                res.status(500).send('Internal Server Error');
        }
    }
};

const updateUser = async (req, res) => {
    const userId = req.data.id;
    const { Name, Email, Password } = req.body;
    try {
        const id = await updateUserServices(Name, Email, Password, userId);
        res.status(200).send({ message: 'User updated successfully' })
    } catch (error) {
        switch (error.message) {
            case 'USER_EXISTED':
                res.status(409).send("User already existed");
                break;
            case 'DATA_NOT_FOUND':
                res.status(404).send("User not found");
                break;
            default:
                res.status(500).send('Internal Server Error');
        }
    }
};

const deleteUser = async (req, res) => {
    const userId = req.data.id;
    try {
        await deleteUserServices(userId);
        res.status(200).send({ message: 'User marked as deleted' })
    } catch (error) {
        switch (error.message) {
            case 'DATA_NOT_FOUND':
                res.status(404).send("User not found");
                break;
            default:
                res.status(500).send('Internal Server Error');
        }
    }
};

const loginUsers = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const token = await loginUserServices(Email, Password);
        res.status(200).send({ token: token })
    } catch (error) {
        switch (error.message) {
            case 'INVALID_CREDENTIALS':
                res.status(401).send("Invalid credentials");
                break;
            default:
                res.status(500).send('An error occurred while logging in');
                console.log(error.message);
        }
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUsers };
