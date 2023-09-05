import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SideBar from '../components/sidebar/SideBar';
import ChapterStatistics from '../components/home/ChapterStatistics';
import Chapters from '../components/home/Chapters';

export default function Home() {
    return (
        <Row>
            <Col lg={9}>
                {/* Home page header */}
                <div className='d-flex justify-content-between'>
                    <div>
                        <h4>Dashboard</h4>
                        <h1>IMY 310</h1>
                    </div>
                    {/*  Calculate and display the current date */}
                    <h4>{new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                </div>
                {/* Statistics section */}
                <ChapterStatistics/>
                {/* Chapters section */}
                <Chapters/>
            </Col>

            <Col lg={3}>
                {/* Side bar */}
                <SideBar />
            </Col>
        </Row>
    )
}