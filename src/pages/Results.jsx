import React, { useState, useEffect } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Answer from '../components/test/Answer';

import { UpdateChapterQuestion } from '../backend/dataManager.js';
import modules from '../backend/json/modules.json';
import questions from '../backend/json/questions.json';

export default function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const [module, setModule] = useState(null);
    const [chapter, setChapter] = useState(null);

    const results = location.state;
    const isExam = false;

    useEffect(() => {
        // Set the initial state once the data is loaded
        if (questions && questions.module && questions.module.length > 0) {
            // do this dynamically
            setModule(modules.data[results.module]);
        }

        if(questions && results) {
            setChapter(questions.module[results.module].chapters[results.chapter]);
        }
    }, [results]);

    const CalculateGrade = () => {
        var total = 0;
        var correct = 0;

        results.questions.forEach((question) => {
            if(question.selectedAnswer === GetCorrectAnswer(chapter?.questions[question.question])) {
                correct++;
                UpdateChapterQuestion(results.module, results.chapter, question.question);
            }
            total++;
        });

        return ((correct / total) * 100).toFixed(1) + "%";
    }

    const GetCorrectAnswer = (question) => {
        return question?.answers.findIndex((answer) => answer.correct === true );
    }

    return (
        <div className="bg-light vh-100">
            <div className="p-5">
                {/* Test header */}
                <div className='d-flex justify-content-between'>
                    <div>
                        <h4 className='text-secondary'>{isExam ? "Exam" : "Practice Test"}</h4>
                        <h1 className='text-primary fw-bold display-4'>{module?.name}</h1>
                    </div>
                </div>

                {/*  Leave test */}
                <div className="btn d-flex align-items-center mt-4">
                    <BiLeftArrowAlt className="text-dark me-3" size={30} />
                    <h4 className='text-dark m-0 p-0 fw-bold' onClick={() => navigate("/")}>Return home</h4>
                </div>

                {/* Make only this scrollable */}
                <Container className='d-flex justify-content-center'>
                    <div style={{ width: '43.0625rem' }}>

                        <div className="bg-white d-flex p-4 justify-content-between shadow rounded">
                            <div>
                                <h2 className='text-dark'>Results</h2>
                                <h2 className='text-primary'>{chapter?.name}</h2>
                            </div>
                            <div className='text-end'>
                                <h2 className="text-dark">Grade</h2>
                                <h2 className="text-primary fw-bold">{CalculateGrade()}</h2>
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