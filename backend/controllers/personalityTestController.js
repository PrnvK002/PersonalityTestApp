import asyncHandler from 'express-async-handler';
import Question from '../models/question.js';
import Test from '../models/test.js';

//@desc get question
//@route get /question/:number
//@access public

export const getQuestion = asyncHandler(async (req,res) => {
    const {number} = req.params;
    const questions = await Question.find({}).skip(number).limit(1);
    if(questions.length){
        res.status(200).json({ ...questions[0] });
    }else{
        res.status(404);
        throw new Error('No questions found');
    }
});

//@desc post question
//@route get /question
//@access public

export const addQuestion = asyncHandler(async (req,res) => {
    const insert = await Question.create({
        questionName : req.body.question,
        type : req.body.type,
        systemType : req.body.systemType
    });
    if(insert){
        res.status(200).json({ message:"succesfully inserted the question"});
    }
    else{
        res.status(500);
        throw new Error('Cannot insert question');
    }
});

//@desc submit test
//@route post /test
//@access public

export const submitTest = asyncHandler(async (req,res) => {

    console.log(req.body);

    const answers = req.body.answer.filter((element) => {
        return { answer : element.answer , questionId : element.question._id };
    });

    const personality = answers.filter((element) => {
        if(element.question.systemType === 'PersonalityType' ){
            if(element.answer === 'stronglyAgree' ){
                return { value : 100 , type : element.question.type }
            }else if(element.answer === 'agree' ){
                return { value : 75 , type : element.question.type }
            }else if(element.answer === 'neitherAgreeNotDisagree' ){
                return { value : 50 , type : element.question.type }
            }else if(element.answer === 'disagree'){
                return { value : 25 , type : element.question.type }
            }else if( element.answer === 'stronglyDisagree' ){
                return { value : 0 , type : element.question.type }
            }
        }
    });

    const learningStyle = answers.filter((element) => {
        if(element.question.systemType === 'LearningStyle' ){
            if(element.answer === 'stronglyAgree' ){
                return { value : 100 , type : element.question.type }
            }else if(element.answer === 'agree' ){
                return { value : 75 , type : element.question.type }
            }else if(element.answer === 'neitherAgreeNotDisagree' ){
                return { value : 50 , type : element.question.type }
            }else if(element.answer === 'disagree'){
                return { value : 25 , type : element.question.type }
            }else if( element.answer === 'stronglyDisagree' ){
                return { value : 0 , type : element.question.type }
            }
        }
    })

    const insert = await Test.create({
        name : req.body.name,
        answers:answers,
        personality,
        learningStyle
    });

    if(insert){
        res.status(200).json({ personalityTest , learningStyle });
    }
    res.status(500);
    throw new Error('Something went wrong while submitting test');
});


