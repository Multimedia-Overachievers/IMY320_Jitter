import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

export default function Chapter({ key, chapter, progress, description }) {
    return (
        <Accordion flush>
            <Accordion.Item eventKey='{key}'>
                <Accordion.Header>
                    <div className="d-flex justify-content-between w-100">
                        <h2>{chapter}</h2>

                        {/* Progress bar */}
                        <div className="d-flex align-items-center">
                            {/* Progress percentage */}
                            <div className="progress-percentage">
                                <p>{progress}%</p>
                            </div>
                            <div className="progress" style={{ width: '400px' }}>
                                <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                        {/* Take test */}
                        <div className="btn btn-primary" onClick={() => console.log('Send me to /quiz/{chapter} or whatever')}>
                            <p>Take quiz</p>
                        </div>
                    </div>
                </Accordion.Header>
                <Accordion.Body>{description}</Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
