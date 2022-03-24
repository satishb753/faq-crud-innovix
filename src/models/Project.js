import mongoose from 'mongoose';

const { Schema, model} = mongoose;

// Create Schema
const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    company_name: {
        type: String,
        required: false,
        trim: true
    },
    start_date: {
        type: Date,
        required: false,
        trim: true
    },
    end_date: {
        type: Date,
        required: false,
        trim: true
    },
    executors: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        trim: true
    }]
});

const Project = model('Project', ProjectSchema);

export default Project;