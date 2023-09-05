import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SideBar from '../components/sidebar/SideBar';
import ModuleStatistics from '../components/home/ModuleStatistics';
import Chapters from '../components/home/Chapters';

export default function Home() {

    let module = "IMY 310";

    // Dummy data
    let chapters = [
        {
            chapter: 'Chapter 1',
            progress: 10,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis aliquet nisl nunc eu nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis aliquet nisl nunc eu nisl.'
        },
        {
            chapter: 'Chapter 2',
            progress: 80,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis aliquet nisl nunc eu nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis aliquet nisl nunc eu nisl.'
        },
        {
            chapter: 'Chapter 3',
            progress: 50,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis aliquet nisl nunc eu nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis aliquet nisl nunc eu nisl.'
        },
        {
            chapter: 'Chapter 4',
            progress: 30,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis aliquet nisl nunc eu nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis aliquet nisl nunc eu nisl.'
        },
    ]
    let moduleOverview = {
        numChapters: 5,
        scores: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    };

    return (
        <div className="bg-light vh-100">
            <Row>
                <Col lg={9} className='scrollable'>
                    <div className="p-5 m-4">
                        {/* Home page header */}
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4 className='text-secondary'>Dashboard</h4>
                                <h1 className='text-primary fw-bold'>{module}</h1>
                            </div>
                            {/*  Calculate and display the current date */}
                            <h4 className='text-secondary'>{new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                        </div>
                        {/* Statistics section */}
                        <ModuleStatistics moduleOverview={moduleOverview} completedChapters={1} timeSpent={91} />
                        {/* Chapters section */}
                        <Chapters chapters={chapters} />
                    </div>
                </Col>

                <Col lg={3}>
                    {/* Side bar */}
                    <SideBar />
                </Col>
            </Row>
        </div>
    )
}