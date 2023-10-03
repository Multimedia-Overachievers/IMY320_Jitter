import React, { useState, useEffect } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Answer from '../components/test/Answer';
import { motion } from 'framer-motion';
import { slideInLeft, fadeIn, transition } from '../styles/framerMotions';
import { Helmet } from 'react-helmet';

import { GetModuleCode } from '../utils/functions.js';
import { UpdateChapterQuestion, AddQuizScore, GetAllModules, GetQuestions } from '../services/api-requests';

export default function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const [chapter, setChapter] = useState(null);

    const [grade, setGrade] = useState(null);
    const [results, setResults] = useState(null);
    const [isExam, setIsExam] = useState(false);

    var [modules, setModules] = useState(null);
    var [questions, setQuestions] = useState(null);


    useEffect(() => {
        setResults(location.state);
    }, []);

    useEffect(() => {
        GetAllModules().then((response) => {
            setModules(response.data);
        });

        GetQuestions(GetModuleCode(results?.module)).then((response) => {
            setQuestions(response.data);
        });
    }, [results]);

    useEffect(() => {
        if (questions && results){
            if(results.exam) {
                setChapter(MergedChapter(questions.chapters));
                setIsExam(true);
            }
            else {
                questions.chapters[results.chapter].questions.forEach(question => {
                    question.chapter = results.chapter;
                });

                setChapter(questions.chapters[results.chapter]);
                setIsExam(false);
            }
        }
    }, [questions, modules]);

    const MergedChapter = (chaptersArray) => {
        var mergedChapter = {
            id: 5,
            name: "Exam",
            questions: []
        };

        chaptersArray.forEach(chapter => {
            chapter.questions.forEach(question => {
                question.chapter = chapter.id;
            });

            mergedChapter.questions = mergedChapter.questions.concat(chapter.questions);
        });
        return mergedChapter;
    }

    useEffect(() => {
        setGrade(CalculateGrade());
    }, [chapter]);

    const CalculateGrade = () => {
        if (!results || !chapter) return;

        var total = 0;
        var correct = 0;
        var correctAnswers = [];
        var hasUpdated = JSON.parse(localStorage.getItem('hasUpdated'))?.hasUpdated;

        results?.questions.forEach(async (question) => {
            var questionInstance 
            if(results.exam) {
                //we have some duplicate indexes in the exam questions so check that result question chapter is the same as the question chapter
                questionInstance = chapter?.questions.find(q => q.chapter === question.chapter && q.id === question.question);    
            }
            else{
                questionInstance = chapter?.questions[question.question];
            }

            if (question.selectedAnswer === GetCorrectAnswer(questionInstance)) {
                correct++;
                correctAnswers.push(question.question);
            }
            total++;
        });

        var score = ((correct / total) * 100).toFixed(1);

        if (!hasUpdated && !isExam) {
            console.log("updating");
            AddQuizScore(results.module, results.chapter, score, results.time);
            if (correctAnswers.length > 0 ) {
                UpdateChapterQuestion(results.module, results.chapter, correctAnswers);
            }
            localStorage.setItem('hasUpdated', JSON.stringify({ hasUpdated: true }));
        }
        return score + "%";

    }

    const GetCorrectAnswer = (question) => {
        return question?.answers.findIndex((answer) => answer.correct === true);
    }

    return (
        <div className="bg-light vh-100">
            <Helmet>
                <title>unIQ - Results</title>
                <meta name="description" content="unIQ is a web application that helps students to prepare for their exams." />
                <meta name="keywords" content="unIQ, exam, preparation" />
                <meta name="author" content="Keelan Matthews, Francois Smith, Ross Tordiffe, Dhairiya Chhipa, Tayla Orsmond" />
            </Helmet>
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
                            {modules?.data[results.module].name}
                        </motion.h1>
                    </div>
                </div>

                {/*  Leave test */}
                <motion.div
                    className="btn d-flex align-items-center mt-4 justify-content-start"
                    onClick={() => navigate("/dashboard")}
                    style={{ width: '180px' }}
                    variants={slideInLeft}
                    initial="hidden"
                    animate="visible"
                    transition={{ ...transition, delay: 0.7 }}
                >
                    <BiLeftArrowAlt className="text-dark me-3" size={30} />
                    <h4 className='text-dark m-0 p-0 fw-bold'>Return home</h4>
                </motion.div>

                {/* Make only this scrollable */}
                <Container className='d-flex justify-content-center results'>
                    <div style={{ width: '43.0625rem' }}>

                        <motion.div
                            className="bg-white d-flex p-4 justify-content-between shadow rounded"
                            variants={slideInLeft}
                            initial="hidden"
                            animate="visible"
                            transition={{ ...transition, delay: 0.6 }}
                        >
                            <div>
                                <h2 className='text-dark'>Results</h2>
                                <h2 className='text-primary'>{chapter?.name}</h2>
                            </div>
                            <div className='text-end'>
                                <h2 className="text-dark">Grade</h2>
                                <h2 className="text-primary fw-bold">{grade}</h2>
                            </div>
                        </motion.div>

                        {/* Answers */}
                        <Answer questions={chapter?.questions} results={results} />

                        {/* Logo */}
                        <motion.div
                            className="d-flex justify-content-center mt-5"
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            transition={{ ...transition, delay: 3 }}
                        >
                            <img src="/images/logo.svg" alt="logo" style={{ width: '4rem' }} />
                        </motion.div>
                    </div>
                </Container>
            </div>
        </div>
    )
}