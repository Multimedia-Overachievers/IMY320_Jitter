import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

export default function Answer({ questions }) {
    return (
        questions?.map((question, index) => (
            <div key={index} className='p-4 rounded shadow mt-3 bg-white'>
                <h3 className='text-dark'>Q1. {question.question}</h3>
                <hr className='my-4 bg-secondary' />

                <div>
                    {
                        question.answers?.map((answer, index) => (
                            <div className="position-relative ms-5">
                                <p
                                    key={index}
                                    className={`circle-${
                                        // Dynamically add the correct answer class
                                        answer.correct ? 'blue text-primary fw-bold' : 'grey'
                                        // ADD FUNCTIONALITY HERE TO ADD THE RED CIRCLE TO THE ANSWER THEY SELECTED THAT IS WRONG
                                        }`}>{answer.answer}</p>
                            </div>
                        ))
                    }
                </div>

                <Accordion flush className='mt-5'>
                    <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                            <div className='d-flex justify-content-between align-items-center w-100'>
                                <p className="text-success m-0 p-0">Correct</p>
                                <p className="text-secondary m-0 p-0 me-4">view explanation</p>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>Lorem Ipsum</Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        ))
    )
}
