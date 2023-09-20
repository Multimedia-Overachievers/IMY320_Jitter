import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import SideBar from '../components/sidebar/SideBar';
import ModuleStatistics from '../components/home/ModuleStatistics';
import Chapters from '../components/home/Chapters';

import { GetAllModules } from '../services/api-requests';

export default function Home() {
    const [module, setModule] = useState(null);
    const [modules, setModules] = useState(null);
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);

    useEffect(() => {
        if(!modules){
            GetAllModules().then((response) => {
                var modules = response.data;
                setModules(modules);
                setModule(modules.data[activeModuleIndex]);
            });
        }
    }, []);

    const SetModuleCallback = (index) => {
        setActiveModuleIndex(index);
        setModule(modules.data[index]);
    }

    // useEffect(() => {
    //     if(modules){
    //         setModule(modules.data[activeModuleIndex]);
    //     }
    //     console.log(activeModuleIndex);
    // }, [module]);


    return (
        <div className="vh-100">
            <Row>
                <Col lg={9} className='scrollable vh-100'>
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
                        <ModuleStatistics module={module} />
                        {/* Chapters section */}
                        <Chapters module={module} />
                    </div>
                </Col>

                <Col lg={3}>
                    {/* Side bar */}
                    <SideBar modules={modules?.data} setModule={SetModuleCallback} />
                </Col>
            </Row>
        </div>
    )
}