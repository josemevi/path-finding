const express = require('express');
const config = require('./helpers/config');
const app = express();

app.use('/views', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/',  (req, res) => {
  res.redirect('views/index.html');
});

app.use(express.json());
app.use(express.urlencoded({
  	extended: false
}));


//CORS Headers
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, authorization, Authorization, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use('/pathFinding',require('./controllers'));

app.listen(config.port, ()=> {
  console.log('Server running on port 3000...');
});