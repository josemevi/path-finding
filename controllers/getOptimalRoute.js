const db = require ('../helpers/db');
const pathFinding = require ('../helpers/findPath');

module.exports = function (req,res){    
    let routesArr = [];
    db.connect().then((obj) => {
        obj.any('SELECT route from user_routes',[]).then((routes) => {                        
            if(routes){
                for(let i = 0; i < routes.length; i++){
                    if(routes[i].route){
                        let items = routes[i].route.split(",");
                        for(let k = 0; k < items.length; k++){
                            if(routesArr.indexOf(items[k]) == -1){
                                routesArr.push(items[k]);
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

