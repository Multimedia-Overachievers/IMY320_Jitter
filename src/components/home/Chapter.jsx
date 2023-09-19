import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { getAverageColor } from '../../utils/functions';
import Link from "react-router-dom";
import DataManager from '../../backend/dataManager';

export default function Chapter({ moduleIndex, index, chapter, progress, description }) {
    const StartQuiz = (e) => {
        e.stopPropagation();
        console.log(`Start quiz for chapter ${index}`);

        console.log(`test/${moduleIndex}/${index}`);
        //DataManager.UpdateChapterProgress('IMY 320', index, 25);
    }

    return (
        <Accordion flush className='shadow m-1 my-4'>
            <Accordion.Item eventKey={index}>
                <Accordion.Header className='rounded'>
                    <div className="d-flex justify-content-between align-items-center w-100 m-3">
                        <h2>{chapter}</h2>

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

                        {/* Take test */}
                        <div
                            className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                            style={{ height: '40px' }}
                            onClick={StartQuiz}
                        >
                            {/* <Link to={`test/${moduleIndex}/${index}`}>Take quiz</Link> */}
                            <p className='text-white fw-bold p-0 mb-1'>Take quiz</p>
                        </div>
                    </div>
                </Accordion.Header>
                <Accordion.Body>{description}</Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
