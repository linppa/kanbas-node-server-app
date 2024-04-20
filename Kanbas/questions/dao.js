import model from './model.js';
export const createQuestion = (question) => model.create(question);
export const deleteQuestion = (id) => model.deleteOne({ _id: id });
export const updateQuestion = (id, question) =>  model.updateOne({ _id: id }, { $set: question });
export const findQuestionsByType = (type, quizID) => model.find({ questionType: type, quizID: quizID });
export const findQuestionByQuiz = (quizID) => model.find({ quizID: quizID });
export const findQuestion = (id) => model.findById(id);