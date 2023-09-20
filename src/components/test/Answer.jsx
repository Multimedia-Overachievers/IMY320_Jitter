import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';

export default function Answer({ questions, results }) {
    const [questionsList, setQuestions] = useState(null);

  
    useEffect(() => {
        var tempList = [];
        results?.questions.forEach(resultQuestion => {
            questions?.forEach(question => {
                if (resultQuestion.question === question.id) {
                    tempList.push({
                        question: question,
                        selectedAnswer: resultQuestion.selectedAnswer,
                        correct: IsAnswerCorrect(question, resultQuestion.selectedAnswer)
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

    return (
        questionsList?.map((questionInstance, index) => (
            <div key={index} className='p-4 rounded shadow mt-3 bg-white'>
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
                                    questionInstance.correct ?
                                    <p className="text-success m-0 p-0">Correct</p>
                                    :
                                    <p className="text-danger m-0 p-0">Incorrect</p>
                                }
                                <p className="text-secondary m-0 p-0 me-4">view explanation</p>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p className='text-dark'>{questionInstance.question.explanation}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        ))
    )
}
