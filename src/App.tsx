import * as React from 'react';
import { useEffect, useState } from 'react';
import QuestionCard from './Components/QuestionCard';
import { getQuizData } from './services/quiz-api';
import { QuestionType } from './types/quiz-types';


const App = () => {
  let [quiz, setQuiz] = useState<QuestionType[]>([])
  let [currentQuestion, setCurrentQuestion] = useState(0)
  let [score, setScore] = useState(0)
  useEffect(() => {
    async function fetchData() {
      const questions: QuestionType[] = await getQuizData(5, 'easy');
      setQuiz(questions)
    }
    fetchData()
  }, [])
  const handelSubmit = (e: React.FormEvent<EventTarget>, currentAns: string) => {
    const selectedQuestion: QuestionType = quiz[currentQuestion]
    e.preventDefault();
    if (currentAns === selectedQuestion.correct_answer) {
      setScore(++score)

    }
    if (currentQuestion !== quiz.length - 1) {
      setCurrentQuestion(++currentQuestion)
    } else {
      alert(`Correct: ${score} outof ${currentQuestion + 1}`)
      setCurrentQuestion(0)
      setScore(0)
    }
  }

  if (!quiz.length) {
    return (
      <h1 className='container m-auto p-20 text-center font-bold text-2xl'>Loading....</h1>
    )
  }
  return (
    <>
      <div className="container m-auto p-20 text-center">
        <h1 className="pb-20">Simple Quiz App</h1>
        <QuestionCard
          option={quiz[currentQuestion].option}
          question={quiz[currentQuestion].question}
          callback={handelSubmit}
        />
      </div>
    </>
  );
}

export default App;