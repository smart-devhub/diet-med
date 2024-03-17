import mongoose from 'mongoose';

export const dbConnection=()=>{
    mongoose.connect(process.env.CONNECT_URL).then(()=>{
        console.log("db Connected")
    }).catch(err=>{
        console.log(err || "db connection error")
    })
}
