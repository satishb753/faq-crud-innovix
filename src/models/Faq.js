import mongoose from 'mongoose';

const { Schema, model} = mongoose;

// Create Schema
const FaqSchema = new Schema({
    faq_category: {
        type: String,
        required: false
    },
    cat_id: {
        type: String,
        required: false
    },
    faq_cat_name: {
        type: String,
        required: false
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const Faq = model('Faq', FaqSchema);

export default Faq;