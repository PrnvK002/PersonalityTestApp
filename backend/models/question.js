import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionName : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true      
    },
    systemType : {
        type : String,
        required : true
    }
});

export default mongoose.model('questions',questionSchema);