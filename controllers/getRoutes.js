const db = require ('../helpers/db');

module.exports = function (req,res){    
    if(!req.body.route){
        req.body.route = [];
    }
    db.connect().then((obj) => {
        obj.any('SELECT user_routes.user_id, user_routes.route, users.name, users.lastname FROM user_routes INNER JOIN users ON user_routes.user_id = users.user_id',[]).then((routes) => {
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