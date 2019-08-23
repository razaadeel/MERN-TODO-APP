const router = require('express').Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/User');



//GET api/users
//Register New User
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json('Please enter all fields');
    }

    //Check existing user. here {email} = {email: email}
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json('User already exist');

            const newUser = new User({
                name,
                email,
                password
            });

            //Create salt & Hash for password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )


                        })
                })
            })
        })
})



module.exports = router;