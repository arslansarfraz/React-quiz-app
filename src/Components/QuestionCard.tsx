import * as React from 'react';
import { useState } from 'react'
import { QuestionProps } from '../types/quiz-types';

const QuestionCard: React.FC<QuestionProps> = ({ question, option, callback }) => {
    let [currentAns, setCurrentAns] = useState('')

    const hundelAns = (e) => {
        setCurrentAns(e.target.value)
    }
    return (
        <div className='m-auto grid place-items-center '>
            <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, currentAns)}>
                <h1 className='font-bold text-2xl'>{question}</h1>
                <div className="pt-5">
                    {option.map((opt: string, ind: number) => {
                        return (
                            <div key={ind}>
                                <div className='text-left content-center'>
                                    <input id="default" type="radio" name="radio" value={opt} onChange={hundelAns} checked={currentAns === opt} required />
                                    <label htmlFor='default'>{opt}</label>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
            </form>
        </div>
    );
}

export default QuestionCard;