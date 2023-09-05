import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { formatMinutes, getAverage } from '../../utils/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaughBeam, faFaceMeh, faFaceSurprise } from '@fortawesome/free-solid-svg-icons';

export default function ModuleStatistics({ moduleOverview, completedChapters, timeSpent }) {

    /**
     * This function returns a FontAwesomeIcon component based on the average passed in
     * @param {float} average 
     * @returns FontAwesomeIcon Component
     */
    const getEmotionComponent = (average) => {
        if (average < 50) {
            return <FontAwesomeIcon icon={faFaceSurprise} />
        } else if (average < 70) {
            return <FontAwesomeIcon icon={faFaceMeh} />
        } else {
            return <FontAwesomeIcon icon={faFaceLaughBeam} />
        }
    }

    return (
        <Row>
            <Col lg={6}>
                <div className='bg-white rounded shadow m-1 p-3'>
                    <div>
                        <p className='text-secondary'>Overview</p>
                        <div>
                            {/* Chart.js here */}
                        </div>
                    </div>
                </div>
            </Col>
            <Col lg={6}>
                <Row>
                    <Col>
                        <div className='bg-white rounded shadow m-1 p-3'>
                            <p className='text-secondary'>Completed chapters</p>
                            <h1>{completedChapters} / {moduleOverview?.numChapters}</h1>
                        </div>
                    </Col>
                    <Col>
                        <div className='bg-white rounded shadow m-1 p-3'>
                            <p className='text-secondary'>Overall time spent</p>
                            <h1>{formatMinutes(timeSpent)}</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-between align-items-center bg-white rounded shadow m-1 mt-4 p-3'>
                            <div>
                                <p className='text-secondary'>Average score</p>
                                <h1>{getAverage(moduleOverview?.scores)}%</h1>
                            </div>
                            <div>
                                {getEmotionComponent(getAverage(moduleOverview?.scores))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
