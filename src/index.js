import mongoose from 'mongoose';

import app from './server.js';
import secret from './config/secret.js';


const port = process.env.PORT || 80;

await mongoose.connect(secret.database,
    {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("MongoDB connected"))
    .catch(error => console.log(error));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})