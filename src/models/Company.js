import mongoose from 'mongoose';

const { Schema, model} = mongoose;

// Create Schema
const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    headQuarter: {
        type: String,
        required: false,
        trim: true
    },
    offices: [
        {
            location: {
                type: String,
                required: false,
                trim: true,
            }
        }
    ],
    employees: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
                trim:true
            }
        }
    ]
});


const Company = model('Company', CompanySchema);

export default Company;