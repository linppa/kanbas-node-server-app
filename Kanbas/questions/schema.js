import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title: String,
    quizID:String,
    points: Number,
    question: String,
    questionType: {
        type: String,
        enum: ['multipleChoice', 'trueFalse', 'fillInBlanks'],
        default: 'multipleChoice'
    },
    choices: [{text:String, isCorrect:Boolean}], // Array of multiple choice options (for multiple choice questions)
    trueFalse: Boolean, // true/false answer (for true/false questions)
    blanks: [{ blank: String, answer: String }] // Array of objects containing blank and corresponding answer (for fill in the blanks questions)
}, {collection:"questions"});

export default questionSchema;