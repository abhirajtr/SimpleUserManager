const User = require('../models/userModels');

const renderLoginPage = (req, res) => {
    if (req.session.admin) return res.redirect('/admin');

    if (req.session.user) return res.redirect('/user');

    res.render('login');
};
const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    // console.log(req.headers);
    try {
        const foundUser = await User.findOne({ email }, { _id: 0 });
        if (foundUser) {
            const isPasswordMatch = await foundUser.comparePassword(password);
            if (isPasswordMatch) {
                if (foundUser.isAdmin) {
                    req.session.admin = true;
                    return res.status(200).send({ redirect: '/admin' });
                }
                req.session.user = foundUser;
                return res.status(200).send({ redirect: '/user' });
            }
            return res.status(401).send({ message: 'Invalid password. Please try again.' });
        }
        res.status(404).send({ message: 'User not found. Please check your email.' })

    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error. Please try again later.');
    }
}

const renderSignupPage = (req, res) => {
    if (req.session.admin) return res.redirect('/admin');

    if (req.session.user) return res.redirect('/user');
    res.render('user/signup');
};
const handleSignup = async (req, res) => {
    console.log("req.body", req.body);

    const { username, email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            const newUser = new User({ username, email, password });
            const savedUser = await newUser.save();
            console.log(savedUser);
            return res.status(201).send({ redirect: '/auth/login' })
        }
        res.status(409).send({ message: "Email address already in use. Please log in." });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error. Please try again later.' })
    }
};
const handleLogout = async (req, res) => {
    try {
        await req.session.destroy();
        res.redirect('/auth');
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}




module.exports = {
    renderLoginPage,
    renderSignupPage,
    handleSignup,
    handleLogin,
    handleLogout
}