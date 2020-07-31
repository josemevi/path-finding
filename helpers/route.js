const db = require ('../helpers/db');

async function generate (){
    let routesArr = [];
    db.connect().then((obj) => {
        obj.any('SELECT route from user_routes',[]).then((routes) => {
            console.log(routes);
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
            console.log(routesArr);         
           obj.done();
           return routesArr;                                
        }).catch((error) => {
            console.log(error);
            obj.done();    
        });
    }).catch((error) => {
        console.log(error);        
        obj.done();
    });
     
}

console.log(await generate());