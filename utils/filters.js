module.exports = {
    isAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'You need to be logged in!');
        res.redirect('/auth/login');
    },
    NotAuth: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    },
    isDoctor: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.isDoctor) {
                return next();
            }
            req.flash('error_msg', 'You\'re not allowed to access this page');
            res.redirect('/auth/login');
        }
        req.flash('error_msg', 'You need to be logged in!');
        res.redirect('/auth/login');
    },
    isAdmin: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.isAdmin) {
                return next();
            }
            req.flash('error_msg', 'You\'re not allowed to access this page');
            res.redirect('/auth/login');
        }
        req.flash('error_msg', 'You need to be logged in!');
        res.redirect('/auth/login');
    }
};