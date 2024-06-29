require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const httpStatus = require('./utils/http.status');


//settings
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:100000}));
app.use(bodyParser.text({ limit: '200mb' }));

app.use(cors());
app.use(express.json());

//server running
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL)
.then(()=>{

  app.listen(process.env.PORT,()=>{

    console.log('Welcome to Mehdi Empire')
  })

}).catch((err)=>{

  throw new Error(err)
})


//app running
app.get("/",(req,res)=>{

    res.send("<h1>Welcome to Mehdi Empire</h1>");
    
})
  
//routes
const adminRouter = require('./routes/admin.route');
const projectRouter = require('./routes/project.route');
const contactRouter = require('./routes/contact.route');

app.use("/api/admin",adminRouter);
app.use("/api/projects",projectRouter);
app.use("/api/contact",contactRouter);

//errors handler
app.use((err,req,res,next)=>{

    res.json({status: err.status || httpStatus.ERROR, code: err.code || 500, message: err.message})
})

app.use("*",(req,res)=>{
    res.json({code: 404, message: "route not found"})
})
