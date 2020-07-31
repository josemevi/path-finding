const db = require ('../helpers/db');

// getUsers
//////////////////////////////////////////////////////////////////////////////////////
// module.exports = function(req,res){
//     db.connect().then((obj) => {
//         obj.any('SELECT * FROM users',[]).then((data) => {                
//                 res.send({users:data,
//                             status:200});
//                 obj.done();                
//         }).catch((error) => {
//             console.log(error);
//             res.send({error:error,
//                 msg:'Something went wrong',
//                 status:500});
//             obj.done();    
//         });
//     }).catch((error) => {
//         console.log(error);
//         res.send({error:error,
//             msg:'Could not connect to the DB',
//             status:500});
//     });     
// };
//////////////////////////////////////////////////////////////////////////////////////

module.exports = function (req,res) {    
    if(req.body.name && req.body.lastname && req.body.email && req.body.password){
        db.connect().then((obj) => {
            obj.one('INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id',
            [req.body.name,
            req.body.lastname,
            req.body.email,
            req.body.password]).then((user) => {
                res.send({
                    msg: 'User Created Successfully',
                    user:user,
                    status:200
                });
                obj.done();                
            }).catch((error) => {
                console.log(error);
                res.send({
                    error:error,
                    msg:'Could not create a new user',
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
            msg:'Fields empty detected, Please fill all the data',
            status:400
        });
    }
};
