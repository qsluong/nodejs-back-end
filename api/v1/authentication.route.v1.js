var bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/environment'),
    mongodb = require('../../databases/mongodb'),
    User = require('../../models/user');

login = (req, res) => {
    console.log(req.body)
    let user;
    User.findOne({ username: req.body.username })
        .then((found) => {
            if (!found) res.status(400).json('Username or/and password invalid');
            else if (found) {
                bcrypt.compare(req.body.password, found.password)
                    .then(compare => {
                        if (!compare) res.status(400).json('Username or/and password invalid');
                        else if (compare) {
                            user = {
                                firstname: found.firstname,
                                lastname: found.lastname,
                                email: found.email,
                                username: found.username,
                                password: found.password
                            };
                            jwt.sign(req.body, config.env.dbSecret, { expiresIn: '1h'}, (err, token) => {
                                err ? console.log(err) : res.status(200).json({token, user});
                            });
                        }
                    })
            }
        })
};

register = (req, res) => {
    User.findOne({ username: req.body.username })
        .then(found => {
            if (found) res.status(422).json('Username already exist');
            else if (!found) {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        return {
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            username: req.body.username,
                            password: hash
                        };
                    })
                    .then(user => {
                        User.create(user)
                            .then(result => res.status(200).json(result))
                    })
                    .catch(error => res.status(400).json(error));
            }
        });
};

tokenVerification = (req, res, next) => {

    if (!req.headers.authorization) {
        res.status(401).json('Please provide a token')
    } else {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.env.dbSecret, (err) => {
            if (err) res.status(400).json(err);
            else next();
        });
    }
};

module.exports = {
    login,
    register,
    token: tokenVerification
};