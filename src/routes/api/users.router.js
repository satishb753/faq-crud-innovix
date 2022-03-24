import { Router } from "express";

import User from "../../models/User.js";
import auth from "../../middleware/auth.js";


const router = Router();

router.get('/', async(req, res) => {

    try {
        //Check for existing user
        const users = await User.find().select('-password');
        if(!users) throw Error('Users not found');

        res.status(200).json(users);
    }
    catch(e) {
        res.status(400).json({msg: e.message});
    }
});

router.get('/nosql-injection', async(req, res) => {
    let user = await User.findOne({
        name : req.body.name,
        password : req.body.password
    });

    console.log(user);

    res.status(200).json(user);
});

export default router;