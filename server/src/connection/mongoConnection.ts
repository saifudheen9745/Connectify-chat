import mongoose from "mongoose";
import { MyConnectOptions } from "../Types/mongoConnection.types";


const dbOptions:MyConnectOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}


export const ConnectToDatabase = ()=>{
    mongoose.connect('mongodb+srv://saifudheen:saifu123@cluster0.ddiqrrn.mongodb.net/Connectify?retryWrites=true&w=majority',dbOptions).then(()=>{
        console.log("Database Connectify connection success");
    }).catch((err)=>{
        console.log("Database Connectify connection error,",err);
    })
}