import { Router } from "express";

import { tokenChecker } from "../../helpers/auth.js";

import Company from "../../models/Company.js";

const router = Router();

router.get('/', tokenChecker, async(req, res) => {

    let companies = await Company.find();
    console.log(companies.length);
    res.status(200).json({companies});

});

router.get('/search/:q', tokenChecker, async(req, res) => {

    let q = req.params.q;
    let companies = await Company.find({name: { $regex: q, $options: 'i'}});
    companies.sort((a, b) => a.name.localeCompare(b.name, 'en'));
    // companies.sort(function(a,b) {return (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0);} );
    // sortedCompanies = quickSort(companies, companies.length-1, 0);
    res.status(200).json({companies});

});

router.post('/', tokenChecker, async (req, res) => {

    let company = [];
    let reqBodyLen = req.body.length;
    for(let i=0; i < reqBodyLen; i++) {
        company.push( { name: req.body[i].name } );
    }
    
    return Company.insertMany(company)
        .then( (docs) => {
            res.status(200).json({ success: true });
        })
        .catch( (e) => {
            return res.status(400).json({error: e.message});
        });
});


// Get Company details

router.get('/company/:id', async (req, res) => {

    let id = req.params.id;

    Company.findOne({ _id: id }).populate({
            path:'employees',
            populate: { 
                    path: '_id',
                    model: 'User',
                    select: {
                        '_id': 1,
                        'name': 1,
                        'email': 1
                    },
                    populate: {
                        path: 'projects',
                        model: 'Project',
                        select: {
                            '_id': 1,
                            'name': 1,
                            'company_name': 1
                        }
                    }
                }
        })
        .exec(function(err,companies){
            res.status(200).json({companies});
            if(err)
            console.log(err);
        });

});


// Update Company details

router.put('/company/:id', tokenChecker, async (req, res) => {
    const { name, headQuarter, offices, employees } = req.body;
    let id = req.params.id;
    let update = await Company.findOneAndUpdate({ _id: id }, { name, headQuarter, offices, employees });
    if(update){
        res.status(200).json({message: "Company details have been updated"});
    } else {
        res.status(400).json({message: "Update failed. Please check your input values."});
    }
});


// Add new Employess to the Company

router.put('/employees/add', tokenChecker, async(req, res) => {
    
    const { companyId, employeeIds } = req.body;
    let company = await Company.findById({_id: companyId});

    let extractedEmployeeIds = company.employees.map(a => a && a._id.toString() );
    
    let filteredEmployeeIds = employeeIds.filter( (elem) => {
        return elem && !extractedEmployeeIds.includes(elem);
    });

    if(filteredEmployeeIds.length > 0){

        company.employees.push(...filteredEmployeeIds);

        try{
            await company.save()
                .then( (data) => {
                    return res.status(200).json({message: "Employee(s) have been updated " + data.employees.toString() });
                })
                .catch( (e) => {
                    return res.status(200).json({message: "Something went wrong while saving the data", e });
                })
        } catch(e) {
            return res.json({message: e.errors});
        }

    } else {
        return res.json({message: "Already up to date" });
    }
    
});


// Delete company

router.delete('/:id', tokenChecker, async(req, res) => {

    try {
        const company = await Company.findById(req.params.id);
        if(!company) throw Error('No company found');

        const removed = await company.remove();

        if(!removed)
            throw Error('Something went wrong while trying to delete the company');

        res.status(200).json({ success: true });
    } catch (e) {
        res.status(400).json({ error: e.message, success: false });
    }
});

export default router;