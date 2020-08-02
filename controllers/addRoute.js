const db = require ('../helpers/db');

module.exports = function (req,res){
    if(req.body.user_id){
        if(!req.body.route){
            req.body.route = [];
        }
        db.connect().then((obj) => {
            obj.one('INSERT INTO user_routes (user_id, route) VALUES ($1, $2) RETURNING user_route_id',
            [req.body.user_id,req.body.route]).then((route) => {
                res.send({
                    msg: 'Routed Created Successfully',
                    route:route,
                    status:201
                });
                obj.done();                
            }).catch((error) => {
                console.log(error);
                res.send({
                    error:error,
                    msg:'Could not create a new route',
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
    }else {
        res.send({
            msg:'Missing User ID',
            status:400
        });
    }
}