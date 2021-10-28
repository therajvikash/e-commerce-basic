const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
// configure dotEnv
dotenv.config({path : './config/config.env'});

//Receiving form data
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//mongoDb connection
mongoose.connect(process.env.MONGO_DB_LOCAL_URL).then(() => {
  console.info(`MongoDB is successfully Connected`);
}).catch(err => {
  console.error(err);
  process.exit(1);
})

//basic request
app.get('/', (req, res) => {
   res.send(`<h2 style="color: brown">Welcome to Node E-Commerce Basic Application</h2>`)
})

//connecting router
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));
app.use('/order', require('./routes/order'));


const port = process.env.PORT || 5000;
app.listen(port, () =>{
  console.log(`Express server is started on http://localhost:${port}`)
})
