import mongoose from "mongoose";

dbConnect = await mongoose.connect("mongodb+srv://satish:aXrrLaWT8rgFbfrr@cluster0.6d5u1.mongodb.net/faq_crud_innovix?retryWrites=true&w=majority")
                            .catch(error => console.log(error));

export default dbConnect;