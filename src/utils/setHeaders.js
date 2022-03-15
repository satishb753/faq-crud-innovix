const whitelist = ['http://localhost:3333', 'http://localhost:8888']

const setHeaders = function(req, res, next){
    const origin = req.headers.origin;


    if(whitelist.indexOf(origin) > -1) {
        res.setHeaders('Access-Control-Allow-Origin', origin);
    }

    res.setHeaders('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeaders('Access-Control-Allow-Headers', 'X-Requested-With, Content-type, Authorization, Accept');

    res.setHeaders('Access-Control-Allow-Credentials', true);

    next();

};

export default setHeaders;