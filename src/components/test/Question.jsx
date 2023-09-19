import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function Question({ question, SetCompleteCallback, questionIndex }) {

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        setSelectedAnswer(null);
    }, [questionIndex]);

    const SelectAnswer = (index) => {
        setSelectedAnswer(index);
        SetCompleteCallback(questionIndex);
    }

    return (
        <div key={questionIndex}>
            <h1 className='fs-1 text-dark text-center my-4'>{question.question}</h1>
            <Form>
                {/* Answers */}
                <Form.Group className='chapter-form overflow-hidden'>
                    {
                        // Be sure to style the selected option when it works @Ross
                        question.answers?.map((answer, index) => (
                            <div 
                                key={index} 
                                className={`shadow p-3 
                                            ${selectedAnswer === index ? 'bg-primary' : 'bg-white'} 
                                            ${selectedAnswer === index ? 'text-white' : 'text-dark'}
                                            fs-3 my-2 rounded`}
                                onClick={() => SelectAnswer(index)}
                            >
                                <Form.Check
                                    type="radio"
                                    name="question-answer"
                                    label={answer.answer}
                                    checked={selectedAnswer === index}
                                    onChange={() => SelectAnswer(index)}
                                />
                            </div>
                        ))
                    }
                </Form.Group>
            </Form>
        </div>
    )
}
