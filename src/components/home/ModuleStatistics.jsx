import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { formatSeconds, getAverage } from '../../utils/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaughBeam, faFaceMeh, faFaceSurprise } from '@fortawesome/free-solid-svg-icons';
import { getAverageColor } from '../../utils/functions';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BarChart } from "./BarChart";
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, transition } from '../../styles/framerMotions';

import { GetAllQuestions } from '../../services/api-requests';

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

export default function ModuleStatistics({ module }) {
    const [questions, setQuestions] = useState(null);
    const [completed, setCompleted] = useState(0);

    /**
     * This function returns a FontAwesomeIcon component based on the average passed in
     * @param {float} average 
     * @returns FontAwesomeIcon Component
     */
    const getEmotionComponent = (average) => {
        if(average === 0) {
            return <FontAwesomeIcon icon={faFaceMeh} className='text-secondary' size="5x" />
        }
        else if (average < 50) {
            return <FontAwesomeIcon icon={faFaceSurprise} className='text-secondary' size="5x" />
        } else if (average < 70) {
            return <FontAwesomeIcon icon={faFaceMeh} className='text-warning' size="5x" />
        } else {
            return <FontAwesomeIcon icon={faFaceLaughBeam} className='text-success' size="5x" />
        }
    }

    const [chartData, setChartData] = useState(null);

    const GetChartData = (activeModule) => {
        return {
            labels: activeModule?.chapters.map((_, index) => `Ch${index + 1}`),
            datasets: [
                {
                    label: 'Average Score',
                    data: activeModule?.chapters.map(chapter => getAverage(chapter.scores)),
                    fill: false,
                    backgroundColor: '#6299EB',
                    borderColor: '#6299EB',
                    borderRadius: 10,
                    borderSkipped: false,

                },
            ],
        };
    }

    useEffect(() => {
        if (module) setChartData(GetChartData(module));
    }, [module, questions]);

    useEffect(() => {
        GetAllQuestions().then((response) => {
            setQuestions(response.data);
        });
    }, []);

    useEffect(() => {
        if (questions && module) {
            setCompleted(GetCompletedChapters());
        }
    }, [questions, module]);

    const GetProgress = (chapter) => {
        var progress = 0;

        chapter.questions.forEach(question => {
            if (question?.finished) {
                progress++;
            }
        });
        return Math.round((progress / chapter.questions?.length) * 100);
    }

    const GetCompletedChapters = () => {
        var completed = 0;

        if (!questions.module) {
            return completed;
        }

        var moduleQuestions = questions?.module[module.index];
        moduleQuestions?.chapters.forEach(chapter => {
            if (GetProgress(chapter) === 100) {
                completed++;
            }
        });

        return completed;
    }

    const GetAverageScore = () => {
        var scores = [];

        module?.chapters.forEach(chapter => {
            chapter.scores.forEach(score => {
                scores.push(score);
            });
        });

        return scores;
    }

    return (
        <Row>
            <Col lg={6}>
                <motion.div
                    className='bg-white rounded shadow m-1 mb-4 p-4 h-100'
                    variants={slideInLeft}
                    initial='hidden'
                    animate='visible'
                    transition={{ ...transition, delay: 0.6 }}
                >
                    <div className='h-100'>
                        <p className='text-secondary mb-4'>Average per chapter</p>
                        <div className='h-100'>
                            {
                                !chartData ?
                                    <span className='d-flex justify-content-center align-items-center h-75'>
                                        <Spinner animation="border" variant="primary" />
                                    </span>
                                    : <BarChart chartData={chartData} />
                            }
                        </div>
                    </div>
                </motion.div>
            </Col>
            <Col lg={6}>
                <Row >
                    <Col>
                        <motion.div
                            className='bg-white rounded shadow m-1 p-4'
                            variants={slideInRight}
                            initial='hidden'
                            animate='visible'
                            transition={{ ...transition, delay: 0.7 }}
                        >
                            <p className='text-secondary mb-4'>Completed chapters</p>
                            {
                                !module ?
                                    <span className='d-flex justify-content-center align-items-center h-100 mb-4'>
                                        <Spinner animation="border" variant="primary" />
                                    </span>
                                    :
                                    <h1 className='text-primary fw-bold text-center'>{completed} / {module?.chapters.length}</h1>
                            }
                        </motion.div>
                    </Col>
                    <Col>
                        <motion.div
                            className='bg-white rounded shadow m-1 p-4'
                            variants={slideInRight}
                            initial='hidden'
                            animate='visible'
                            transition={{ ...transition, delay: 0.8 }}
                        >
                            <p className='text-secondary mb-4'>Time spent on module</p>
                            {
                                !module ?
                                    <span className='d-flex justify-content-center align-items-center h-100 mb-4'>
                                        <Spinner animation="border" variant="primary" />
                                    </span>
                                    :
                                    <h1 className='text-primary fw-bold text-center'>{formatSeconds(module?.timeSpent)}</h1>
                            }
                        </motion.div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <motion.div
                            className='d-flex justify-content-between align-items-center bg-white rounded shadow m-1 mt-4 p-4'
                            variants={slideInRight}
                            initial='hidden'
                            animate='visible'
                            transition={{ ...transition, delay: 0.9 }}
                        >
                            <div>
                                <p className='text-secondary mb-4'>Average score</p>
                                {
                                    !module ?
                                        <span className='d-flex justify-content-center align-items-center h-100 mb-4'>
                                            <Spinner animation="border" variant="primary" />
                                        </span>
                                        :
                                        <h1 className={`
                                    text-${getAverageColor(getAverage(GetAverageScore()))} 
                                    fw-bold
                                    `}>
                                            {getAverage(GetAverageScore())}%
                                        </h1>
                                }
                            </div>
                            <div>
                                {getEmotionComponent(getAverage(GetAverageScore()))}
                            </div>
                        </motion.div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
