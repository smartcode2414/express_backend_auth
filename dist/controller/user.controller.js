"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const validations_1 = require("../validations");
const jwtToken_1 = require("../services/jwtToken");
const sendMail_1 = __importDefault(require("../services/sendMail"));
const config_1 = require("../config/config");
const userController = {
    register: (req, res) => {
        const { name, email, password } = req.body;
        try {
            if (!email || !password)
                return res.status(400).json({ msg: 'Please fill in all fields.' });
            if (!(0, validations_1.validateEmail)(email))
                return res.status(400).json({ msg: 'Invalid Email.' });
            User_1.default.findOne({ email: email }).then(user => {
                if (user) {
                    return res.status(400).json({ msg: 'Email already exists' });
                }
                else {
                    if (config_1.emailVerify) {
                        const newUser = {
                            name,
                            email,
                            password
                        };
                        // bcrypt.genSalt(10, (err, salt) => {
                        //   bcrypt.hash(newUser.password, salt, (err, hash) => {
                        //     if (err) throw err;
                        //     newUser.password = hash;
                        //   })
                        // })
                        const activation_token = (0, jwtToken_1.createActivationToken)(newUser);
                        const url = `${config_1.CLIENT_URL}/activate/${activation_token}`;
                        (0, sendMail_1.default)(email, url, "Verify your email address");
                        res.json({ msg: "Email verification message has been sent." });
                    }
                    const newUser = new User_1.default({
                        email: email,
                        password: password
                    });
                    bcryptjs_1.default.genSalt(10, (err, salt) => {
                        bcryptjs_1.default.hash(newUser.password, salt, (err, hash) => {
                            if (err)
                                throw err;
                            newUser.password = hash;
                            // Save to the DB
                            newUser.save()
                                .then(user => res.status(200).json({ msg: 'Successfuly registered', user }))
                                .catch(err => {
                                res.status(400).json({ msg: "Registration failed", err });
                                console.warn(err);
                            });
                        });
                    });
                }
            });
        }
        catch (err) {
            console.warn(err);
        }
        ;
    },
    // Email register verifycation
    verifyRegister: (req, res) => {
        const { activation_token } = req.body;
        jsonwebtoken_1.default.verify(activation_token, config_1.ACTIVATION_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(400).json({ msg: "Un verifyed Token" });
            }
            else {
                const { name, email, password } = decoded;
                const newUser = new User_1.default({
                    name,
                    email,
                    password,
                });
                // Save to the DB
                newUser.save()
                    .then(user => res.status(200).json({ msg: 'Successfuly registered', user }))
                    .catch(err => {
                    res.status(400).json({ msg: "Registration failed", err });
                    console.warn(err);
                });
            }
        });
    },
    // Login 
    login: (req, res) => {
        const { email, password } = req.body;
        User_1.default.findOne(email)
            .then(user => {
            if (!user) {
                return res.json({ msg: "Email does not exist!" });
            }
            bcryptjs_1.default.compare(password, user.password)
                .then(isMatch => {
                if (!isMatch) {
                    return res.json({ msg: "Password incorrect!" });
                }
                const payload = { name: user.name, email: user.email };
                jsonwebtoken_1.default.sign(payload, config_1.LOGIN_TOKEN_SECRET, { expiresIn: 3600 }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        msg: 'Successfully logged in!',
                        token: token
                    });
                });
            });
        });
    }
};
exports.default = userController;
//# sourceMappingURL=user.controller.js.map