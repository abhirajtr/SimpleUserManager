const User = require('../models/userModels');

const dashboard = async (req, res) => {
    const users = await User.find({ $or: [{ isAdmin: { $exists: false } }, { isAdmin: false }] }, { password: 0 });
    res.render('admin/dashboard', { users });
};

const renderAddUserPage = (req, res) => {
    res.render('admin/add-user');
}
const handleAddUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            const newUser = new User({ username, email, password });
            await newUser.save();
            return res.status(201).json({ redirect: '/admin' });
        }
        res.status(409).json({ message: "User  already exists." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error. Please try again later.' })
    }
};

const renderEditUserPage = async (req, res) => {
    const userId = req.params.id;
    try {
        const foundUser = await User.findById(userId);
        res.render('admin/edit-user', { user: foundUser });
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error. Please try again later.');
    }

}
const handleEditUser = async (req, res) => {
    const { userId, username, email } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { username, email } },
            { new: true });
        res.status(200).json({
            updatedUser,
            message: 'User details updated successfully!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error. Please try again later.');
    }
}

const handleBlockUser = async (req, res) => {
    console.log("body", req.body);
    try {
        const userId = req.body.userId;
        console.log("userID", userId);
        await User.findByIdAndUpdate(userId, { isBlocked: true });
        res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
        
    }
}
const handleUnblockUser = async (req, res) => {
    console.log("body", req.body);
    try {
        const userId = req.body.userId;
        console.log("userID", userId);
        await User.findByIdAndUpdate(userId, { isBlocked: false });
        res.status(200).json({ message: 'User unblocked successfully '});
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error. please try angain later.')
    }
}

module.exports = {
    dashboard,
    renderAddUserPage,
    handleAddUser,
    renderEditUserPage,
    handleEditUser,
    handleBlockUser,
    handleUnblockUser
}