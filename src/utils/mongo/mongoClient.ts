import mongoose from "mongoose";

const init = () => mongoose.connect('mongodb://localhost:27017/social_media')
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err))

export default init;
