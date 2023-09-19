import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import SideBar from '../components/sidebar/SideBar';
import ModuleStatistics from '../components/home/ModuleStatistics';
import Chapters from '../components/home/Chapters';

import data from '../backend/json/modules.json';

export default function Home() {

    const [module, setModule] = useState(null);

    useEffect(() => {
        // Set the initial state once the data is loaded
        if (data && data.data && data.data.length > 0) {
            setModule(data.data[0]);
        }
    }, []);

    return (
        <div className="vh-100">
            <Row>
                <Col lg={9} className='scrollable scrollable vh-100'>
                    {/* Background image */}
                    <div className='bg-light position-absolute w-100 h-100 d-flex align-items-center justify-content-center' style={{zIndex: -1}}>
                        <img className='background-image' src="/images/home-background.svg" alt="" />
                    </div>
                    <div className="p-5 m-4 " style={{zIndex: 2}}>
                        {/* Home page header */}
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4 className='text-secondary'>Dashboard</h4>
                                <h1 className='text-primary fw-bold display-4'>{module?.name}</h1>
                            </div>
                            {/*  Calculate and display the current date */}
                            <h4 className='text-secondary'>{new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                        </div>
                        {/* Statistics section */}
                        <ModuleStatistics module={module} timeSpent={91} />
                        {/* Chapters section */}
                        <Chapters module={module} />
                    </div>
                </Col>

                <Col lg={3}>
                    {/* Side bar */}
                    <SideBar modules={data.data} setModule={setModule} />
                </Col>
            </Row>
        </div>
    )
}