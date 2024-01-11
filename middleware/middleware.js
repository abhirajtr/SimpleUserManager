function isLogged(req, res, next) {
    req.session.user ? next() : res.redirect('/auth/login');
}

module.exports = isLogged;