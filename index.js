
//! Handle Error External Express => Start the Code :
process.on("uncaughtException" , (error)=>{
   console.log("Error" , error);
})


import express from 'express'
import { initApp } from './src/initApp.js';
import { dbConnection } from './DataBase/dbConnection.js';
import cors from 'cors';
import mongoose from 'mongoose';
import { createOnlineOrder } from './src/modules/order/order.controller.js';


const app = express()
const port = 5000


//& Express Middle Ware Cors To Production :
app.use(cors()) ;

// mongoose.set("debug" , true) ;
// mongoose.set("strictQuery" , true) ;





app.post('/webhook', express.raw({type: 'application/json'}), createOnlineOrder);


























//& Express Middle Ware :
app.use(express.json()) ;
app.use("/" , express.static("Uploads")) ;

initApp(app)

//& Data Base Connection :
dbConnection()


//! Handle Error dbConnection And External Express => End the Code :
process.on("unhandledRejection" , (error)=>{
   console.log("Error" , error);
});


app.listen(port, () => console.log(`Server is running ....`))

