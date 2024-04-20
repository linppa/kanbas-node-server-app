import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    title: String,
    description: String,
    courseId: String,
    points: Number,
    quizType: {
        type: String,
        enum: ['Practice Quiz', 'Graded Quiz', 'Graded Survey', 'Ungraded Survey'],
        default: 'Graded Quiz'
    
    },
    timeLimit : Number,
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",},
    isShuffled: Boolean,
    ismultipleAttempts: Boolean,
    isPublished: Boolean,
    viewResponse:  {
      type: String,
      enum: ["Always"],
      default: "Always",},
    showCorrectAnswers: {
      type: String,
      enum: ["Immediately", "After all attempts are graded", "After due date"],
      default: "Immediately",},
    accessCode: String,
    onQuestionAtaTime: Boolean,
    webcamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
    dueDate: String,
    availabilityDate: String,
    untilDate: String,
    questions : [{type: mongoose.Schema.Types.ObjectId, ref: "QuestionsModel"}],
  },
  { collection: "quizes" });
export default QuizSchema;