const dashboard = (req, res) => {
    res.render('user/dashboard', {user:req.session.user});
}

module.exports = {
    dashboard, 
}