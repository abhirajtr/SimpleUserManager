function isLoggedAdmin(req, res, next) {

    req.session.admin ? next() : res.redirect('/auth');
}

function isLoggedUser(req, res, next) {
    req.session.user ? next() : res.redirect('/auth');
}

module.exports = {
    isLoggedAdmin,
    isLoggedUser
}