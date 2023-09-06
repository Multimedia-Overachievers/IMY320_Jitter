import React, { useState, useEffect } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Container } from 'react-bootstrap';
import { BiLogOut } from 'react-icons/bi';
import Answer from '../components/test/Answer';

import data from '../backend/json/questions.json';

export default function Results() {

    const [module, setModule] = useState(null);

    const isExam = false;

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
                    <div className='d-flex justify-content-center text-secondary align-items-center p-4 shadow rounded' style={{ height: '70px' }}>
                        <p className='m-0 p-0 text-secondary'>Log out</p>
                        <BiLogOut className='ms-2' size='1.3em' style={{ rotate: '180deg' }} />
                    </div>
                </div>

                {/*  Leave test */}
                <div className="d-flex align-items-center mt-4">
                    <BiLeftArrowAlt className="text-dark me-3" size={30} />
                    <h4 className='text-dark m-0 p-0 fw-bold'>Return home</h4>
                </div>

                {/* Make only this scrollable */}
                <Container className='d-flex justify-content-center'>
                    <div style={{ width: '43.0625rem' }}>

                        <div className="bg-white d-flex p-4 justify-content-between shadow rounded">
                            <div>
                                <h2 className='text-dark'>Results</h2>
                                <h2 className='text-primary'>{module?.chapters[0].name}</h2>
                            </div>
                            <div className='text-end'>
                                <h2 className="text-dark">Grade</h2>
                                <h2 className="text-primary fw-bold">89%</h2>
                            </div>
                        </div>

                        {/* Answers */}
                        <Answer questions={module?.chapters[0].questions} />

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