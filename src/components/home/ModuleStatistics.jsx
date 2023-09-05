import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { formatMinutes, getAverage } from '../../utils/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaughBeam, faFaceMeh, faFaceSurprise } from '@fortawesome/free-solid-svg-icons';

export default function ModuleStatistics({moduleOverview, completedChapters, timeSpent}) {

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
                <div>
                    <p>Overview</p>
                    <div>
                        {/* Chart.js here */}
                    </div>
                </div>
            </Col>
            <Col lg={6}>
                <Row>
                    <Col>
                        <p>Completed chapters</p>
                        <h1>{completedChapters} / {moduleOverview?.numChapters}</h1>
                    </Col>
                    <Col>
                        <p>Overall time spent</p>
                        <h1>{formatMinutes(timeSpent)}</h1>
                    </Col>
                </Row>
                <Row>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <p>Average score</p>
                            <h1>{getAverage(moduleOverview?.scores)}%</h1>
                        </div>
                        <div>
                            {getEmotionComponent(getAverage(moduleOverview?.scores))}
                        </div>
                    </div>
                </Row>
            </Col>
        </Row>
    )
}
