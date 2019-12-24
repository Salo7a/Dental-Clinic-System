const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
RememberMeStrategy = require('passport-remember-me-extended').Strategy;
const Chance = require('chance');

passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
    Doctor
        .findOne({where: {Email: email}})
        .then(function (Doctor) { // successful query to database
            if (!Doctor) {
                Patient
                    .findOne({where: {Email: email}})
                    .then(function (Patient) { // successful query to database
                        if (!Patient) {
                            return done(null, false, {message: 'Email is Not Registered'});
                        }
                        console.log("Same Pass " + Patient.comparePass(password));
                        if (Patient.comparePass(password)) {
                            console.log("Yep");
                            return done(null, Patient, {message: 'Logged In Successfully'});
                        } else {
                            console.log("Nope");
                            return done(null, false, {message: 'Wrong Password'});
                        }

                    })
                    .catch(function (err) { // something went wrong with query to db
                        done(err);
                    });
            } else {
                if (Doctor.comparePass(password)) {
                    console.log("Yep");
                    return done(null, Doctor, {message: 'Logged In Successfully'});
                } else {
                    console.log("Nope");
                    return done(null, false, {message: 'Wrong Password'});
                }
            }
        })
        .catch(function (err) { // something went wrong with query to db
            done(err);
        });
}));

// serialize session, only store user id in the session information
passport.serializeUser(function (User, done) {
    done(null, User.id);
});

// from the user id, figure out who the user is...
passport.deserializeUser(function (userId, done) {
    if (userId > 54000) {
        Doctor
            .findOne({where: {id: userId}})
            .then(function (user) {
                done(null, user);
            }).catch(function (err) {
            done(err, null);
        });
    } else {
        Patient
            .findOne({where: {id: userId}})
            .then(function (user) {
                done(null, user);
            }).catch(function (err) {
            done(err, null);
        });
    }

});
passport.use(new RememberMeStrategy(
    function (token, done) {
        Doctor
            .findOne({where: {RememberHash: token}})
            .then(function (user) {
                if (!user) {
                    Patient
                        .findOne({where: {RememberHash: token}})
                        .then(function (user) {
                            user.update({
                                RememberHash: null
                            }).then(result => {
                                return done(null, user);
                            });
                        }).catch(function (err) {
                        return done(err, null);
                    });
                } else {
                    user.update({
                        RememberHash: null
                    }).then(result => {
                        return done(null, user);
                    });
                }

            }).catch(function (err) {
            return done(err, null);
        });

    }, issueToken
));

function issueToken(user, done) {
    let chance = new Chance();
    let token = chance.word({length: 60});
    user.update({
        RememberHash: token
    }).then(result => {
        return done(null, token);
    }).catch(err => {
        return done(err);
    })
}

// chance.string({length: 60})