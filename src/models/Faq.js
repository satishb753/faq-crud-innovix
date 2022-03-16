import mongoose from 'mongoose';

const { Schema, model} = mongoose;

// Create Schema
const FaqSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const Faq = model('faq', FaqSchema);

export default Faq;