import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { motion } from 'framer-motion';
import { fadeIn, slideInLeft, transition } from '../../styles/framerMotions';

export default function Question({ questionInstance, SetCompleteCallback, questionIndex}) {

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        setSelectedAnswer(questionInstance.selectedAnswer);
    }, [questionIndex])

    const SelectAnswer = (index) => {
        setSelectedAnswer(index);
        SetCompleteCallback(questionIndex, index);
    }

    return (
        <div key={questionIndex}>
            <motion.h2 
                className='text-dark text-center my-4'
                variants={fadeIn}
                initial='hidden'
                animate='visible'
                transition={{...transition, delay: 0.2}}
            >
                {questionInstance.question.question}
            </motion.h2>
            <Form>
                <Form.Group className='chapter-form overflow-hidden'>
                    {
                        questionInstance.question.answers?.map((answer, index) => (
                            <motion.div 
                                key={index} 
                                className={`shadow p-3 
                                            ${selectedAnswer === index ? 'bg-primary' : 'bg-white'} 
                                            ${selectedAnswer === index ? 'text-white' : 'text-dark'}
                                            fs-3 my-2 rounded`}
                                onClick={() => SelectAnswer(index)}
                                variants={slideInLeft}
                                initial='hidden'
                                animate='visible'
                                transition={{...transition, delay: 0.2 + index * 0.1}}
                            >
                                <Form.Check
                                    type="radio"
                                    name="question-answer"
                                    label={answer.answer}
                                    checked={selectedAnswer === index}
                                    onChange={() => SelectAnswer(index)}
                                />
                            </motion.div>
                        ))
                    }
                </Form.Group>
            </Form>
        </div>
    )
}
