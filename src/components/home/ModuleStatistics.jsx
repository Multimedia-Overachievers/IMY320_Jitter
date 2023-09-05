import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { formatMinutes, getAverage } from '../../utils/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaughBeam, faFaceMeh, faFaceSurprise } from '@fortawesome/free-solid-svg-icons';
import { getAverageColor } from '../../utils/functions';

export default function ModuleStatistics({ moduleOverview, completedChapters, timeSpent }) {

    /**
     * This function returns a FontAwesomeIcon component based on the average passed in
     * @param {float} average 
     * @returns FontAwesomeIcon Component
     */
    const getEmotionComponent = (average) => {
        if (average < 50) {
            return <FontAwesomeIcon icon={faFaceSurprise} className='text-danger' size="5x" />
        } else if (average < 70) {
            return <FontAwesomeIcon icon={faFaceMeh} className='text-warning' size="5x" />
        } else {
            return <FontAwesomeIcon icon={faFaceLaughBeam} className='text-success' size="5x" />
        }
    }

    return (
        <Row>
            <Col lg={6}>
                <div className='bg-white rounded shadow m-1 p-3'>
                    <div>
                        <p className='text-secondary mb-4'>Overview</p>
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
                            <p className='text-secondary mb-4'>Completed chapters</p>
                            <h1 className='text-primary fw-bold text-center'>{completedChapters} / {moduleOverview?.numChapters}</h1>
                        </div>
                    </Col>
                    <Col>
                        <div className='bg-white rounded shadow m-1 p-3'>
                            <p className='text-secondary mb-4'>Overall time spent</p>
                            <h1 className='text-primary fw-bold text-center'>{formatMinutes(timeSpent)}</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-between align-items-center bg-white rounded shadow m-1 mt-4 p-3'>
                            <div>
                                <p className='text-secondary mb-4'>Average score</p>
                                <h1 className={`
                                    text-${getAverageColor(getAverage(moduleOverview?.scores))} 
                                    fw-bold
                                    `}>
                                        {getAverage(moduleOverview?.scores)}%
                                </h1>
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
