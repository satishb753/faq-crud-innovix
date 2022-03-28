import mongoose from 'mongoose';

import app from './server.js';
import secret from './config/secret.js';


const port = process.env.PORT;

await mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("MongoDB connected"))
    .catch(error => console.log(error));

app.listen(port, () => {
    console.log(`Docker App listening on port ${port}`);
})