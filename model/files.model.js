import mongoose from "mongoose";

const filesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    filesUrl: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})



const Files = new mongoose.model('Files', filesSchema);

export default Files;