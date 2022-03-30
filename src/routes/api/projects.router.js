import { Router } from "express";

import Project from "../../models/Project.js";

const router = Router();

router.get('/', async(req, res) => {

    let projects = await Project.find();
    console.log(projects.length);
    res.status(200).json({projects});

});

router.post('/', async (req, res) => {

    let projects = [];
    let reqBodyLen = req.body.length;
    for(let i=0; i < reqBodyLen; i++) {
        projects.push( { name: req.body[i].name, executors: req.body[i].executors } );
    }
    
    return Project.insertMany(projects)
        .then( (docs) => {
            res.status(200).json({ success: true });
        })
        .catch( (e) => {
            return res.status(400).json({error: e.message});
        });
});

export default router;