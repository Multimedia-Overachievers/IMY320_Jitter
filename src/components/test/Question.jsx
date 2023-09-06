import React from 'react';
import Form from 'react-bootstrap/Form';

export default function Question({ index, question, answers }) {
    return (
        <div key={index}>
            <h1 className='fs-1 text-dark text-center my-4'>{question}</h1>
            <Form>
                    {/* Answers */}
                    <Form.Group className='chapter-form'>
                        {
                            // Be sure to style the selected option when it works @Ross
                            answers?.map((answer, index) => (
                                <div key={index} className='shadow p-3 bg-white text-dark fs-3 my-2 rounded'>
                                    <Form.Check type="radio" label={answer.answer} />
                                </div>
                            ))
                        }
                    </Form.Group>
                </Form>
        </div>
    )
}