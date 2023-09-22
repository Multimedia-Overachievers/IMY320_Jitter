import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { motion } from 'framer-motion';
import { slideInLeft, transition } from '../../styles/framerMotions';

export default function Answer({ questions, results }) {
    const [questionsList, setQuestions] = useState(null);

    useEffect(() => {
        //if its not a string

        var tempList = [];
        results?.questions.forEach(resultQuestion => {
            questions?.forEach(question => {
                if (resultQuestion.question === question.id) {
                    tempList.push({
                        question: question,
                        selectedAnswer: resultQuestion.selectedAnswer,
                        correct: IsAnswerCorrect(question, resultQuestion.selectedAnswer),
                        NotAnswered: resultQuestion.selectedAnswer === -1 ? true : false
                    });
                }
            });
        });
        setQuestions(tempList);
    }, [questions]);

    const IsAnswerCorrect = (question, selectedAnswer) => {
        if(selectedAnswer === GetCorrectAnswer(question)) {
            return true;
        }

        return false;
    }

    const GetCorrectAnswer = (question) => {
        return question?.answers.findIndex((answer) => answer.correct === true );
    }

    const GetResult = (question) => {
        if(question.NotAnswered) return <p className="text-danger m-0 p-0">Not Answered</p>
        else{
            if(question.correct) return <p className="text-success m-0 p-0">Correct</p>
            else return <p className="text-danger m-0 p-0">Incorrect</p>
        }
    }

    return (
        questionsList?.map((questionInstance, index) => (
            <motion.div 
                key={index} 
                className='p-4 rounded shadow mt-3 bg-white'
                variants={slideInLeft}
                initial='hidden'
                animate='visible'
                transition={{...transition, delay: 0.5 + index * 0.1}}
            >
                <h3 className='text-dark'>Q{index+1}. {questionInstance.question.question}</h3>
                <hr className='my-4 bg-secondary' />

                <div>
                    {
                        questionInstance.correct ?
                        questionInstance.question.answers?.map((answer, index) =>(
                            <div className="position-relative ms-5" key={index}>
                                <p className={`circle-${index === GetCorrectAnswer(questionInstance.question) ? 'blue text-primary fw-bold' : 'grey'}`}>
                                    {answer.answer}
                                </p>
                            </div>
                        ))
                        :
                        questionInstance.question.answers?.map((answer, index) =>(
                            <div className="position-relative ms-5" key={index}>
                                <p className={
                                    questionInstance.selectedAnswer === index ?
                                    `circle-${index === GetCorrectAnswer(questionInstance.question) ? 'blue text-primary fw-bold' : 'red text-danger fw-bold'}`
                                    :
                                    `circle-${index === GetCorrectAnswer(questionInstance.question) ? 'blue text-primary fw-bold' : 'grey'}`
                                }>
                                    {answer.answer}
                                </p>
                            </div>
                        ))
                    }
                </div>

                <Accordion flush className='mt-5'>
                    <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                            <div className='d-flex justify-content-between align-items-center w-100'>
                                {
                                    GetResult(questionInstance)
                                }
                                <p className="text-secondary m-0 p-0 me-4">view explanation</p>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p className='text-dark'>{questionInstance.question.explanation}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </motion.div>
        ))
    )
}
