import React, { useState, useEffect } from 'react';
import Question from '../components/test/Question';
import QuestionBar from '../components/test/QuestionBar';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { MdOutlineTimer } from 'react-icons/md';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { toast, Toaster } from 'react-hot-toast';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import { motion } from 'framer-motion';
import { fadeIn, slideInLeft, slideInBottom, transition } from '../styles/framerMotions';

import { formatTimer } from '../utils/functions.js';

import { shuffle, GetModuleCode } from '../utils/functions.js';
import { GetAllModules, GetQuestions } from '../services/api-requests';

export default function Test() {
    const navigate = useNavigate();

    const [module, setModule] = useState(null);
    const [chapter, setChapter] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [questionsList, setQuestionList] = useState([]);

    const [timer, setTimer] = useState('');
    const [timeSpent, setTimeSpent] = useState(0);
    const [timerWarning, setTimerWarning] = useState(false);
    const [barPercentage, setBarPercentage] = useState(100);
    
    const { moduleCode, chapterCode } = useParams();
    const isExam = false;

    useEffect(() => {
        GetAllModules().then((response) => {
            var modules = response.data;

            if (modules && moduleCode) {
                setModule(modules.data[moduleCode]);
            }
        });

        GetQuestions(GetModuleCode(moduleCode)).then((response) => {
            var questions = response.data;

            if (questions && moduleCode && chapterCode) {
                setChapter(questions.chapters[chapterCode]);
            }
        });

    }, [moduleCode, chapterCode]);

    useEffect(() => {
        if (chapter?.questions) {
            var question = shuffle(chapter?.questions, 6);
            var list = [];

            question.forEach(element => {
                var questionInstance = new QuestionInstance(element);
                list.push(questionInstance);
            });

            list[0].active = true;
            setQuestionList(list);
            startTimer(600);
        }
    }, [chapter]);

    // Display model if the user tries to go back to the previous page
    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);
    const MoveToNext = () => {
        if (currentQuestion < questionsList.length - 1) {
            var newList = [...questionsList];
            newList[currentQuestion].active = false;
            setCurrentQuestion(currentQuestion + 1);
            newList[currentQuestion + 1].active = true;
            setQuestionList(newList);
        }
    }

    const MoveToPrev = () => {
        if (currentQuestion > 0) {
            var newList = [...questionsList];
            newList[currentQuestion].active = false;
            setCurrentQuestion(currentQuestion - 1);
            newList[currentQuestion - 1].active = true;
            setQuestionList(newList);
        }
    }

    const MoveToIndex = (index) => {
        if (index >= 0 && index < questionsList.length) {
            var newList = [...questionsList];
            newList[currentQuestion].active = false;
            newList[index].active = true;
            setCurrentQuestion(index);
            setQuestionList(newList);
        }
    }

    const SetCompleted = (questionIndex, answer) => {
        if (questionIndex >= 0 && questionIndex < questionsList.length) {
            var newList = [...questionsList];
            newList[questionIndex].completed = true;
            newList[questionIndex].selectedAnswer = answer;
            setQuestionList(newList);
        }
    }

    const FinishQuiz = (force) => {
        //check that all questions are completed
        if (!force) {
            var completed = true;
            questionsList.forEach(element => {
                if (!element.completed) {
                    completed = false;
                }
            });

            if (completed) {
                navigate('/result', { state: CreateTestResult() });
            }
            else {
                toast.error('Please complete all questions before submitting.', {
                    style: {
                        padding: '16px',
                        color: '#4e5662',
                    },
                    iconTheme: {
                        primary: '#e07b7b',
                    },
                    duration: 3000,
                });
            }
        }
        else {
            navigate('/result', { state: CreateTestResult() });
        }
    }
    
    const onBackButtonEvent = (e) => {
        e.preventDefault();
        setModalShow(true);
    }

    const CreateTestResult = () => {
        console.log("questionsList", questionsList);

        return {
            module: module.index,
            chapter: chapter.id,
            questions: questionsList.map((question) => {
                if (question.selectedAnswer === null) question.selectedAnswer = -1;

                return {
                    question: question.question.id,
                    selectedAnswer: question.selectedAnswer,
                }
            }),
            time: timeSpent,
        }
    }

    const startTimer = (seconds) => {
        
        const endTime = new Date().getTime() + seconds * 1000;

        console.log("seconds", seconds);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;
            const secondsLeft = Math.floor((distance % (1000 * seconds)) / 1000);

            if (distance < 0) {
                clearInterval(interval);
                setTimeSpent(secondsLeft);
                setTimer('00:00');
                setTimerWarning(true);
                FinishQuiz(true);
            } else {
                updateBar(secondsLeft)
                setTimeSpent(timeSpent => timeSpent + 1);
                setTimer(formatTimer(secondsLeft));
            }
        }, 1000);
        
    }
    const updateBar = (seconds) => {
        var percentage = (seconds / 600) * 100;
        setBarPercentage(percentage);
    }

    class QuestionInstance {
        question;
        selectedAnswer;
        completed;
        active;

        constructor(question) {
            this.question = question;
            this.selectedAnswer = null;
            this.completed = false;
            this.active = false;
        }
    }

    return (
        <div className="bg-light vh-100">
            <div><Toaster /></div>
            <div className="p-5">
                {/* Test header */}
                <div className='d-flex justify-content-between'>
                    <div>
                        <motion.h4
                            className='text-secondary'
                            variants={slideInLeft}
                            initial="hidden"
                            animate="visible"
                            transition={{ ...transition, delay: 0.2 }}
                        >
                            {isExam ? "Exam" : "Practice Test"}
                        </motion.h4>
                        <motion.h1
                            className='text-primary fw-bold display-4'
                            variants={slideInLeft}
                            initial="hidden"
                            animate="visible"
                            transition={{ ...transition, delay: 0.5 }}
                        >
                            {module?.name}
                        </motion.h1>
                    </div>
                </div>

                {/*  Leave test */}
                <motion.div
                    className="btn d-flex align-items-center mt-4 pointer" onClick={() => setModalShow(true)}
                    variants={slideInLeft}
                    initial="hidden"
                    animate="visible"
                    transition={{...transition, delay: 0.7 }}
                >
                    <BiLeftArrowAlt className="text-dark me-3" size={30} />
                    <h4 className='text-dark m-0 p-0 fw-bold'>Leave Test</h4>
                </motion.div>

                <Container className='d-flex justify-content-center'>
                    <div style={{ width: '55rem' }}>
                        {/* Test heading with time bar */}
                        <div className="d-flex justify-content-center flex-column text-center">
                            <motion.h2
                                className="text-primary"
                                variants={fadeIn}
                                initial="hidden"
                                animate="visible"
                                transition={{ ...transition, delay: 0.3 }}
                            >
                                {chapter?.name}
                            </motion.h2>

                            <motion.div
                                className='d-flex align-items-center justify-content-center'
                                variants={fadeIn}
                                initial="hidden"
                                animate="visible"
                                transition={{ ...transition, delay: 0.5 }}
                            >
                                <MdOutlineTimer className={timerWarning ? "text-danger me-2" : "text-primary me-2"} size={30} />
                                
                                <p className='text-dark m-0 p-0 '>{timer} left</p>
                            </motion.div>

                            {/*  Progress bar */}
                            <motion.div
                                className="progress mt-3" style={{ height: '5px' }}
                                variants={fadeIn}
                                initial="hidden"
                                animate="visible"
                                transition={{ ...transition, delay: 0.7 }}
                            >
                                <progress className={!timerWarning ? "progress-bar" : "progress-bar progress-warning"} value={barPercentage} max={100} style={{ width: '100%' }}></progress>
                            </motion.div>
                        </div>

                        {/* Question */}
                        {questionsList && questionsList.length > 0 && questionsList[currentQuestion]
                            ? <Question questionIndex={currentQuestion} SetCompleteCallback={SetCompleted} questionInstance={questionsList[currentQuestion]} />
                            : <p>No Questions found for chapter</p>
                        }

                        {/* Next question button */}
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <motion.p
                                className='text-primary m-0 p-0 fs-5 pointer'
                                onClick={() => MoveToPrev()}
                                variants={slideInBottom}
                                initial="hidden"
                                animate="visible"
                                transition={{ ...transition, delay: 1 }}
                            >
                                previous
                            </motion.p>
                            {/* current question out of total */}
                            <motion.p
                                className="text-secondary fw-bold m-0 p-0"
                                variants={slideInBottom}
                                initial="hidden"
                                animate="visible"
                                transition={{ ...transition, delay: 1.3 }}
                            >
                                {currentQuestion + 1} / 6
                            </motion.p>
                            <motion.div
                                variants={slideInBottom}
                                initial="hidden"
                                animate="visible"
                                transition={{ ...transition, delay: 1.5 }}
                            >
                                {
                                    (currentQuestion !== questionsList.length - 1) ?
                                        <Button size="lg" className="text-white fw-bold" onClick={() => MoveToNext()}>Next</Button>
                                        :
                                        <Button size="lg" className="text-white fw-bold" onClick={() => FinishQuiz(false)}>Submit</Button>
                                }
                            </motion.div>
                        </div>

                        {/* Question bar */}
                        <QuestionBar questionData={questionsList} SelectEvent={MoveToIndex} />

                        {/* Logo */}
                        <motion.div 
                            className="d-flex justify-content-center mt-5"
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            transition={{ ...transition, delay: 1 }}
                        >
                            <img src="/images/logo.svg" alt="logo" style={{ width: '4rem' }} />
                        </motion.div>
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