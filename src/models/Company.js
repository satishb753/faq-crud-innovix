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
            location: {             // "Populate Virtuals"
                type: String,
                required: false,
                trim: true,
            }
        }
    ],
    employees: [        // "Populate Virtuals"
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ]
});

// CompanySchema.virtual('employees._id', {
//     ref: 'User',
//     localField:'_id',
//     foreignField:'_id'
// })

const Company = model('Company', CompanySchema);

export default Company;