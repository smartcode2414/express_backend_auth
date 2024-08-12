import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import User from "../models/User";
import { validateEmail } from "../validations";
import { createActivationToken } from "../services/jwtToken";
import sendEmail from "../services/sendMail";
import { ACTIVATION_TOKEN_SECRET, CLIENT_URL, emailVerify, LOGIN_TOKEN_SECRET } from "../config/config";

const userController = {
  register: (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
      if (!email || !password)
        return res.status(400).json({ msg: 'Please fill in all fields.' })
      if (!validateEmail(email))
        return res.status(400).json({ msg: 'Invalid Email.' })

      User.findOne({ email: email }).then(user => {
        if (user) {
          return res.status(400).json({ msg: 'Email already exists' })
        } else {


          if (emailVerify) {
            const newUser = {
              name,
              email,
              password
            }

            // bcrypt.genSalt(10, (err, salt) => {
            //   bcrypt.hash(newUser.password, salt, (err, hash) => {
            //     if (err) throw err;
            //     newUser.password = hash;
            //   })
            // })

            const activation_token = createActivationToken(newUser);

            const url = `${CLIENT_URL}/activate/${activation_token}`;

            sendEmail(email, url, "Verify your email address");
            res.json({ msg: "Email verification message has been sent." })
          }

          const newUser = new User({
            email: email,
            password: password
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;

              // Save to the DB
              newUser.save()
                .then(user => res.status(200).json({ msg: 'Successfuly registered', user }))
                .catch(err => {
                  res.status(400).json({ msg: "Registration failed", err });
                  console.warn(err);
                })
            })
          })
        }
      })

    } catch (err) {
      console.warn(err)
    };
  },

  // Email register verifycation
  verifyRegister: (req: Request, res: Response) => {
    const { activation_token } = req.body;

    jwt.verify(activation_token, ACTIVATION_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({ msg: "Un verifyed Token" })
      } else {
        const { name, email, password } = decoded;

        const newUser = new User({
          name,
          email,
          password,
        })
        // Save to the DB
        newUser.save()
          .then(user => res.status(200).json({ msg: 'Successfuly registered', user }))
          .catch(err => {
            res.status(400).json({ msg: "Registration failed", err });
            console.warn(err);
          })
      }
    })
  },

  // Login 
  login: (req: Request, res: Response) => {
    const { email, password } = req.body;

    User.findOne(email)
      .then(user => {
        if (!user) {
          return res.json({ msg: "Email does not exist!" })
        }

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return res.json({ msg: "Password incorrect!" })
            }

            const payload = { name: user.name, email: user.email }

            jwt.sign(payload, LOGIN_TOKEN_SECRET, { expiresIn: 3600 }, (err, token) => {
              res.status(200).json({
                success: true,
                msg: 'Successfully logged in!',
                token: token
              })
            })
          })
      })
  }
}

export default userController;