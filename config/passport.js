const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Doctor = require('../models').Doctor;

passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
    Doctor
        .findOne({where: {Email: email}})
        .then(function (Doctor) { // successful query to database
            if (!Doctor) {
                return done(null, false, {message: 'Email is Not Registered'});
            }
            console.log("Same Pass " + Doctor.comparePass(password));
            if (Doctor.comparePass(password)) {
                console.log("Yep");
                return done(null, Doctor, {message: 'Logged In Successfully'});
            } else {
                console.log("Nope");
                return done(null, false, {message: 'Wrong Password'});
            }
            //  Doctor.comparePass(password).then(isMatch => {
            //      console.log(isMatch);
            //      console.log(password);
            //     if(isMatch){
            //         return done(null, Doctor, { message: 'Logged In Successfully' });
            //     }
            //     else {
            //         return done(null, false, { message: 'Wrong Password' });
            //     }
            // }).catch(function(err) { // something went wrong
            //      done(err);});
        })
        .catch(function (err) { // something went wrong with query to db
            done(err);
        });
}));

// serialize session, only store user id in the session information
passport.serializeUser(function (Doctor, done) {
    done(null, Doctor.id);
});

// from the user id, figure out who the user is...
passport.deserializeUser(function (userId, done) {
    Doctor
        .findOne({where: {id: userId}})
        .then(function (user) {
            done(null, user);
        }).catch(function (err) {
        done(err, null);
    });
});
