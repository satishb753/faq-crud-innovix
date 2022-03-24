import { Router } from "express";
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import User from "../../models/User.js";
import auth from "../../middleware/auth.js";

import { tokenChecker, privilegeChecker } from '../../helpers/auth.js';

const router = Router();

router.post('/login', async (req, res) => {
    const data = _.pick(req.body, ['email', 'password']);
    await User.findByCredentials(data.email, data.password).then((userData) => {
        userData.generateAuthToken().then((token) => {
	    const {status, uid, name, email, access, iat} = jwt.decode(token);
	    const payload = {token, status, uid, name, email, access, iat};
            res.header('x-auth', token).send(payload);
        });
    }).catch((e) => {
        res.status(400).send('invalid');
    });
});


router.post('/register', async(req, res) => {
 
    //check privilige:
    // const allowAccess = privilegeChecker(req.userInfo.access, ['isAdmin']);
    // if(!allowAccess){
    //     res.status(403).send('invalid');
    //     return;  //exit the function to make sure the user without privilige can't create a new user.
    // }
    const data = req.body;
    const user = new User(data);
    user.save().then((doc) => {
        res.send('success');
    }).catch((e) => {
        // writeLog(e, {file: 'server.js:94'});
        res.send('invalid');
    });

});

router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user) throw Error('User does not exist');
        res.json(user);
    } catch (e) {
        res.status(400).json({msg: e.message});
    }
})

//  Input : void, identified by session cookie.
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 500, 503.
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send({ message: "Logout failed", err });
      }
      req.sessionID = null;
      req.logout();
      res.status(200).send({ message: "Logout success" });
    });
  });

export default router;