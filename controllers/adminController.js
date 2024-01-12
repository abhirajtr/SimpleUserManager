const User = require('../models/userModels');

const dashboard = async (req, res) => {
    const users = await User.find({ $or: [{ isAdmin: { $exists: false } }, { isAdmin: false }] }, { password: 0 });
    res.render('admin/dashboard', { users });
}

module.exports = {
    dashboard
}