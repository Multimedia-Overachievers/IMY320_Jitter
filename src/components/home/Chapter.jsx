import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { getAverageColor } from '../../utils/functions';

export default function Chapter({ key, chapter, progress, description }) {
    return (
        <Accordion flush className='shadow m-1 my-4'>
            <Accordion.Item eventKey='{key}'>
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
                            onClick={() => console.log('Send me to /quiz/{chapter} or whatever')}
                        >
                            <p className='text-white fw-bold p-0 mb-1'>Take quiz</p>
                        </div>
                    </div>
                </Accordion.Header>
                <Accordion.Body>{description}</Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
