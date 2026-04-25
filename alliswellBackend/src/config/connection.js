import mongoose from 'mongoose'


export const DBconnection=async()=>{
    return mongoose.connect(process.env.DBURL)
}