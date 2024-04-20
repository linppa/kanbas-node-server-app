import model from "./model.js";

export const findquizesForCourse =  (courseId) => model.find({ courseid: courseId});
export const findQuiz =  (id) =>  model.findById(id);
export const createQuiz =  (quiz) => { 
  delete quiz._id;
  return model.create(quiz);
};
export const updateQuiz =  (id, quiz) =>  model.updateOne({ _id: id }, { $set: quiz });
export const deleteQuiz =  (id) =>  model.deleteOne({ _id: id });