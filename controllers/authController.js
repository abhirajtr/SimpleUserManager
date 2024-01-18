const User = require('../models/userModels');

const renderLoginPage = (req, res) => {
    if (req.session.admin) return res.redirect('/admin');

    if (req.session.user) return res.redirect('/user');

    res.render('login');
};
const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email }, { _id: 0 });
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found. Please check your email.' });
        }
        const isPasswordMatch = await foundUser.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password. Please try again.' });
        }
        if (foundUser.isBlocked) {
            return res.status(403).json({ message: "Oops! It seems like your account has been temporarily blocked." });
        }
        if (foundUser.isAdmin) {
            req.session.admin = true;
            return res.status(200).json({ redirect: '/admin' });
        }
        req.session.user = foundUser;
        return res.status(200).json({ redirect: '/user' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error. Please try again later.' });
    }
}

const renderSignupPage = (req, res) => {
    if (req.session.admin) return res.redirect('/admin');

    if (req.session.user) return res.redirect('/user');
    res.render('user/signup');
};
// const handleSignup = async (req, res) => {
//     console.log("req.body", req.body);

//     const { username, email, password } = req.body;
//     try {
//         const foundUser = await User.findOne({ email })
//         if (!foundUser) {
//             const newUser = new User({ username, email, password });
//             const savedUser = await newUser.save();
//             console.log(savedUser);
//             return res.status(201).json({ redirect: '/auth/' });
//         }
//         res.status(409).send({ message: "Email address already in use. Please log in." });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: 'Internal Server Error. Please try again later.' })
//     }
// };
const handleSignup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = User({ username, email, password });
        const savedUser = await newUser.save();
        return res.status(201).json({ redirect: '/auth/' });
    } catch (error) {
        console.error(error);
        if (error.code === 11000 && error.keyPattern.email) {
            return res.status(409).json({ message: "Email address already in use. Please log in." });
        }
        res.status(500).send({ message: 'Internal Server Error. Please try again later.' });
    }
}
const handleLogout = async (req, res) => {
    try {
        await req.session.destroy();
        res.redirect('/auth');
    } catch (error) {
        console.error(error);
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