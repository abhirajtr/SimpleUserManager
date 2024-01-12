const User = require('../models/userModels');

const dashboard = async (req, res) => {
    const users = await User.find({ $or: [{ isAdmin: { $exists: false } }, { isAdmin: false }] }, { password: 0 });
    res.render('admin/dashboard', { users });
};

const renderAddUserPage = (req, res) => {
    res.render('admin/user-edit');
}
const handleAddUser = async (req, res) => {
    // console.log("req.body", req.body);

    const { username, email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            const newUser = new User({ username, email, password });
            const savedUser = await newUser.save();
            // console.log(savedUser);
            // return res.status(201).send({ redirect: '/auth/login' })
            return res.status(201).send({ redirect: '/admin'});
        }
        res.status(409).send({ message: "User  already exists." });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error. Please try again later.' })
    }
};

module.exports = {
    dashboard,
    renderAddUserPage,
    handleAddUser,
}