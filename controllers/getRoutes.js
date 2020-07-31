const db = require ('../helpers/db');

module.exports = function (req,res){    
    if(!req.body.route){
        req.body.route = [];
    }
    db.connect().then((obj) => {
        obj.any('SELECT * from user_routes',[]).then((routes) => {
            res.send({
                routes:routes,
                status:200
            });
            obj.done();                
        }).catch((error) => {
            console.log(error);
            res.send({
                error:error,
                msg:'Could not retrieve routes list',
                status:500
            });
            obj.done();    
        });
    }).catch((error) => {
        console.log(error);
        res.send({
            error:error,
            msg:'Could not connect to the DB',
            status:500
        });
        obj.done();
    });   
}