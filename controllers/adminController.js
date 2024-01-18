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
            return res.status(200).json({ redirect: '/admin', message: 'User added successfully' });
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
    try {
        const userId = req.body.userId;
        await User.findByIdAndUpdate(userId, { isBlocked: true });
        res.status(200).json({ status: 'Blocked', userId });
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error.' })
    }
}
const handleUnblockUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        await User.findByIdAndUpdate(userId, { isBlocked: false });
        res.status(200).json({ status: 'Unblocked', userId });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error. please try angain later.')
    }
}

const handleSearchUser = async (req, res) => {
    const searchInput = req.body.searchTerm;
    // if(!searchInput) {
    //     const users = await User.find({ $or: [{ isAdmin: { $exists: false } }, { isAdmin: false }] }, { password: 0 });
    //     return res.status(200).json(users);
    // }
    // // const { searchInput } = req.body;
    // const searchResult = await User.find({ $text: { $search: searchInput } });
    // console.log(searchResult);
    // res.status(200).json(searchResult);
    const users = await User.find({ $and: [{ $or: [{ username: { $regex: new RegExp(searchInput, 'i') } }, { email: { $regex: new RegExp(searchInput, 'i') } }] }, { isAdmin: false }] });
    res.status(200).json(users);
}

module.exports = {
    dashboard,
    renderAddUserPage,
    handleAddUser,
    renderEditUserPage,
    handleEditUser,
    handleBlockUser,
    handleUnblockUser,
    handleSearchUser
}