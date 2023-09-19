import React, { useState, useEffect } from 'react';
import Question from '../components/test/Question';
import QuestionBar from '../components/test/QuestionBar';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { MdOutlineTimer } from 'react-icons/md';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';

import modules from '../backend/json/modules.json';
import questions from '../backend/json/questions.json';

export default function Test() {
    const navigate = useNavigate();

    const [module, setModule] = useState(null);
    const [chapter, setChapter] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [modalShow, setModalShow] = useState(false);

    const { moduleCode, chapterCode } = useParams();

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
        if(modules && moduleCode) {
            setModule(modules.data[0]);
        }

        if(questions && moduleCode && chapterCode) {
            setChapter(questions.module[moduleCode].chapters[chapterCode]);
        }

    }, [moduleCode, chapterCode, chapter]);

    const MoveToNext = () => {
        if(currentQuestion < chapter?.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    const MoveToPrev = () => {
        if(currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    return (
        <div className="bg-light vh-100">
            <div className="p-5">
                {/* <div>{deadline}</div> */}
                {/* Test header */}
                <div className='d-flex justify-content-between'>
                    <div>
                        <h4 className='text-secondary'>{isExam ? "Exam" : "Practice Test"}</h4>
                        <h1 className='text-primary fw-bold display-4'>{module?.name}</h1>
                    </div>
                </div>

                {/*  Leave test */}
                <div className="btn d-flex align-items-center mt-4 pointer" onClick={() => setModalShow(true)}>
                    <BiLeftArrowAlt className="text-dark me-3" size={30} />
                    <h4 className='text-dark m-0 p-0 fw-bold'>Leave Test</h4>
                </div>

                <Container className='d-flex justify-content-center'>
                    <div style={{ width: '50rem' }}>
                        {/* Test heading with time bar */}
                        <div className="d-flex justify-content-center flex-column text-center">
                            <h2 className="text-primary">{chapter?.name}</h2>

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
                        {chapter
                            ? <Question question={chapter?.questions[currentQuestion]}/>
                            : <p>No Questions found for chapter</p>
                        }
                        
                        {/* Next question button */}
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <p className='text-primary m-0 p-0 fs-5 pointer' onClick={() => MoveToPrev()}>previous</p>
                            {/* current question out of total */}
                            <p className="text-secondary fw-bold m-0 p-0">{currentQuestion+1} / {chapter?.questions.length}</p>
                            <Button size="lg" className="text-white fw-bold" onClick={() => MoveToNext()}>Next</Button>
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

            {/* Confirmation modal */}
            <ConfirmationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title="Leave Test"
                body="Are you sure you want to leave the test? Your progress will be lost"
                confirmText="Leave"
                confirmAction={() => navigate(-1)}
            />
        </div>
    )
}