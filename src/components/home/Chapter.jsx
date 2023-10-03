import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { getAverageColor } from '../../utils/functions';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { slideInLeft, transition } from '../../styles/framerMotions';

import { GetModuleCode } from '../../utils/functions';
import { GetQuestions } from '../../services/api-requests';

export default function Chapter({ moduleIndex, index, chapter, description }) {
    const [progress, setProgress] = useState(null);
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        GetQuestions(GetModuleCode(moduleIndex)).then((response) => {
            setQuestions(response.data);
        })

    }, [moduleIndex]);

    useEffect(() => {
        GetProgress();
    }, [questions]);

    const GetProgress = () => {
        var chapterInstance = questions?.chapters[index];
        var tempProgress = 0;

        chapterInstance?.questions.forEach(question => {
            if (question?.finished) {
                tempProgress++;
            }
        });

        setProgress(Math.round((tempProgress / chapterInstance?.questions.length) * 100));
    }

    return (
        <motion.div
            variants={slideInLeft}
            initial='hidden'
            animate='visible'
            transition={{ ...transition, delay: 0.4 + (index * 0.1)}}
        >
            <Accordion flush className='shadow m-1 my-4'>
                <Accordion.Item eventKey={index}>
                    <Accordion.Header className='rounded'>
                        <Row className="w-100 m-3">
                            <Col xs={5} className='d-flex align-items-center'>
                                <h2 className='p-0 m-0 text-info d-block text-truncate'>{chapter}</h2>
                            </Col>
                            <Col xs={4} className='d-flex align-items-center'>
                                {/* Progress bar */}
                                <div className="d-flex align-items-center">
                                    {/* Progress percentage */}
                                    <div className="progress-percentage me-3">
                                        <p className={`m-0 p-0 text-${getAverageColor(progress)}`}>{progress}%</p>
                                    </div>
                                    <div className="progress" style={{ width: '400px' }}>
                                        <div className={`bg-${getAverageColor(progress)} progress-bar`} role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={3} className='d-flex justify-content-end'>
                                {/* Take test */}
                                <Link to={`test/${moduleIndex}/${index}`} state={{duration: 600, exam: false, chapters: null}} className='text-white fw-bold p-0 mb-1 text-decoration-none btn btn-primary btn-sm d-flex justify-content-center align-items-center' style={{ height: '40px', width: '100px' }}>Take quiz</Link>
                            </Col>
                        </Row>
                    </Accordion.Header>
                    <Accordion.Body className='text-dark'>{description}</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </motion.div>
    )
}
