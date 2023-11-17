import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/social_media')

const conn = mongoose.connection

conn.on('open', () => console.log("DB Connected"))
conn.on('error', (err) => console.log(err))

export default conn;
