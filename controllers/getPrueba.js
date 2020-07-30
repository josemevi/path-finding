let db = require ('../helpers/db');

module.exports = function(req,res){
    console.log(req);
    // res.send({
    //     msg: "hola desde el server",
    //     status: 200
    // })

    db.connect().then((obj) => {
        obj.any('SELECT * FROM users',[]).then((data) => {                
                res.send({users:data,
                            status:200});
                obj.done();                
        }).catch((error) => {
            console.log(error);
            res.send({error:error,
                msg:'Something went wrong',
                status:500});
            obj.done();    
        });
    }).catch((error) => {
        console.log(error);
        res.send({error:error,
            msg:'Could not connect to the DB',
            status:500});
    });     
};
