const app = require('./server')
const dotenv = require('dotenv')

dotenv.config();
const port = process.env.PORT || 30001;

const { dbConnect } = require('./db');
dbConnect();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})