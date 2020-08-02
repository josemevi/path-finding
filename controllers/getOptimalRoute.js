const db = require ('../helpers/db');
const pathFinding = require ('../helpers/findPath');

module.exports = function (req,res){    
    let routesArr = [];
    db.connect().then((obj) => {
        obj.any('SELECT route FROM user_routes',[]).then((routes) => {                                           
            if(routes){
                for(let i = 0; i < routes.length; i++){
                    if(routes[i].route.length > 0){                     
                        for(let k = 0; k < routes[i].route.length; k++){                     
                            if(routesArr.indexOf(routes[i].route[k]) == -1){
                                routesArr.push(routes[i].route[k]);
                            }                                                        
                        }                        
                    }                                
                }
            }
            let optimalPath = pathFinding(routesArr);
            res.send({                
                optimalPath,
                status:200
            });
            obj.done();                               
        }).catch((error) => {
            console.log(error);
            res.send({
                error:error,
                msg:'Could not generate a route',
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

