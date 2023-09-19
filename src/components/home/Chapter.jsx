import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { getAverageColor } from '../../utils/functions';
import { Link } from "react-router-dom";

import { GetAllQuestions } from '../../services/api-requests';

export default function Chapter({ moduleIndex, index, chapter, description }) {
    var progress = 0;

    
    var questions = {};
    GetAllQuestions().then((response) => {
        questions = response.data;
    });

    const GetProgress = () => {
        var chapter = questions?.module[moduleIndex].chapters[index];
        chapter.questions?.forEach(question => {
            if (question?.finished) {
                progress++;
            }
        });
        progress = Math.round((progress / chapter.questions?.length) * 100);
    }

    GetProgress();

    return (

        <Accordion flush className='shadow m-1 my-4'>
            <Accordion.Item eventKey={index}>
                <Accordion.Header className='rounded'>
                    <Row className="w-100 m-3">
                        <Col className='d-flex align-items-center'>
                            <h2 className='p-0 m-0'>{chapter}</h2>
                        </Col>
                        <Col className='d-flex align-items-center'>
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
                        <Col className='d-flex justify-content-end'>
                            {/* Take test */}
                            <div
                                className="btn btn-primary btn-sm d-flex justify-content-center align-items-center "
                                style={{ height: '40px', width: '100px' }}
                            >
                                <Link to={`test/${moduleIndex}/${index}`} className='text-white fw-bold p-0 mb-1 text-decoration-none'>Take quiz</Link>
                            </div>
                        </Col>
                    </Row>
                </Accordion.Header>
                <Accordion.Body className='text-dark'>{description}</Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
