import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { formatMinutes, getAverage } from '../../utils/functions';

export default function ModuleStatistics({chapterOverview, completedChapters, timeSpent}) {
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
                        <h1>{completedChapters} / {chapterOverview?.numChapters}</h1>
                    </Col>
                    <Col>
                        <p>Overall time spent</p>
                        <h1>{formatMinutes(timeSpent)}</h1>
                    </Col>
                </Row>
                <Row>
                    <div className='d-flex'>
                        <div>
                            <p>Average score</p>
                            <h1>{getAverage(chapterOverview?.scores)}%</h1>
                        </div>
                        <div>
                            {/* Icon */}
                        </div>
                    </div>
                </Row>
            </Col>
        </Row>
    )
}
