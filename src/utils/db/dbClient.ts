import mongoose from "mongoose";

function instanceEventListeners({ conn }) {
    conn.on('connected', () => {
        console.log('Database - Connection status: connected');
    });
    conn.on('disconnected', () => {
        console.log('Database - Connection status: disconnected');
    });
    conn.on('reconnected', () => {
        console.log('Database - Connection status: reconnected');
    });
    conn.on('close', () => {
        console.log('Database - Connection status: close ');
    });
    conn.on('error', () => {
        console.log('Database - Connection status: Error ');
        conn.close();
    })
}

const init = () => {
    mongoose.connect('mongodb://localhost:27017/social_media')
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err))

}


const mongoMethods = {
    init,
}

export default mongoMethods;