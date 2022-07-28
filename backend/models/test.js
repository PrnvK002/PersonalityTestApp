import mongoose from "mongoose";

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    questionId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "questions"
    },
    answer : {
        type : String,
        required : true
    }
});

const testSchema = new Schema({
    answers : [ answerSchema ],
    name : {
        type : String,
        required : true
    },
    learningStyle : {
        type : Array,
        required : true
    },
    personality : {
        type : Array,
        required : true
    }
});

export default mongoose.model('test',testSchema);
