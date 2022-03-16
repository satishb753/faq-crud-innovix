import { Router } from "express";

import User from "../../models/Faq.js";
import auth from "../../middleware/auth.js";
import Faq from "../../models/Faq.js";

const router = Router();

router.get('/', async(req, res) => {

    try {
        //Check for existing user
        const Faqs = await Faq.find();
        if(!Faqs) throw Error('Faqs not found');

        res.status(200).json(Faqs);
    }
    catch(e) {
        res.status(400).json({msg: e.message});
    }
});


router.post('/', auth, async(req, res) => {
    
    const newFaq = new Faq({
        question: req.body.question,
        answer: req.body.answer
    })

    try {
        const faq = await newFaq.save();
        if(!faq) throw Error('Something went wrong while saving faq');

        res.status(200).json(faq);

    } catch (e) {
        res.status(400).json({ error: e.message});
    }
});

router.delete('/:id', auth, async(req, res) => {

    try {
        const faq = await Faq.findById(req.params.id);
        if(!faq) throw Error('No faq found');

        const removed = await faq.remove();

        if(!removed)
            throw Error('Something went wrong while trying to delete the faq');

        res.status(200).json({ success: true });
    } catch (e) {
        res.status(400).json({ error: e.message, success: false });
    }
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

export default router;