import { Quiz, QuestionType } from "../types/quiz-types";
const shuffelArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)
export const getQuizData = async (amount: number, difficulty: string): Promise<QuestionType[]> => {

    const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=27&difficulty=${difficulty}&type=multiple`);
    const { results } = await res.json();

    const quiz: QuestionType[] = results.map((questionObj: Quiz) => {
        return {
            question: questionObj.question,
            answer: questionObj.correct_answer,
            correct_answer: questionObj.correct_answer,
            option: shuffelArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
        }
    })
    return quiz;

}
