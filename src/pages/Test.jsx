import React, { useState, useEffect } from 'react';
import Question from '../components/test/Question';
import QuestionBar from '../components/test/QuestionBar';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { MdOutlineTimer } from 'react-icons/md';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { BiLogOut } from 'react-icons/bi';

import data from '../backend/json/questions.json';

export default function Test() {

    const [module, setModule] = useState(null);

    const isExam = false;

    const questionBarData = [
        {
            completed: true,
            active: false,
        },
        {
            completed: true,
            active: false,
        },
        {
            completed: false,
            active: true,
        },
        {
            completed: false,
            active: false,
        },
        {
            completed: false,
            active: false,
        },
        {
            completed: false,
            active: false,
        },
    ];

    useEffect(() => {
        // Set the initial state once the data is loaded
        if (data && data.module && data.module.length > 0) {
            // do this dynamically
            setModule(data.module[0]);
        }
    }, []);

    return (
        <div className="bg-light vh-100">
            <div className="p-5">
                {/* Test header */}
                <div className='d-flex justify-content-between'>
                    <div>
                        <h4 className='text-secondary'>{isExam ? "Exam" : "Practice Test"}</h4>
                        <h1 className='text-primary fw-bold display-4'>{module?.name}</h1>
                    </div>

                    {/* Log out */}
                    <div className='d-flex justify-content-center text-secondary align-items-center p-4 shadow rounded' style={{height: '70px'}}>
                        <p className='m-0 p-0 text-secondary'>Log out</p>
                        <BiLogOut className='ms-2' size='1.3em' style={{ rotate: '180deg' }} />
                    </div>
                </div>

                {/*  Leave test */}
                <div className="d-flex align-items-center mt-4">
                    <BiLeftArrowAlt className="text-dark me-3" size={30} />
                    <h4 className='text-dark m-0 p-0 fw-bold'>Leave Test</h4>
                </div>

                <Container className='d-flex justify-content-center'>
                    <div style={{ width: '43.0625rem' }}>
                        {/* Test heading with time bar */}
                        <div className="d-flex justify-content-center flex-column text-center">
                            <h2 className="text-primary">{module?.chapters[0].name}</h2>

                            <div className='d-flex align-items-center justify-content-center'>
                                <MdOutlineTimer className="text-primary me-2" size={30} />

                                {/* MAKE THIS TIME DYNAMIC */}
                                <p className='text-dark m-0 p-0 '>6 minutes 24 seconds left</p>
                            </div>

                            {/*  Progress bar */}
                            <div className="progress mt-3" style={{ height: '5px' }}>
                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        {/* Question */}
                        <Question question={module?.chapters[0].questions[0].question} answers={module?.chapters[0].questions[0].answers} />

                        {/* Next question button */}
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <p className='text-primary m-0 p-0 fs-5'>previous</p>
                            {/* current question out of total */}
                            <p className="text-secondary fw-bold m-0 p-0">1 / {module?.chapters[0].questions.length}</p>
                            <Button size="lg" className="text-white fw-bold">Next</Button>
                        </div>

                        {/* Question bar */}
                        <QuestionBar questionData={questionBarData} />

                        {/* Logo */}
                        <div className="d-flex justify-content-center mt-5">
                            <img src="/images/logo.svg" alt="logo" style={{ width: '4rem' }} />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}