import { Router } from "express";

const router = Router();

const auth = () => {};

router.get('/user', auth, async(req, res) => {
    try {
        console.log("/user router called")
    }
    catch(e) {
        res.status(400).json({msg: e.message});
    }
})

export default router;