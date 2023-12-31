import React, { useRef, useEffect, useState } from 'react';
import { Row, Col, Nav, Navbar, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { BsFillPersonFill } from 'react-icons/bs';
import { Wake } from '../services/api-requests';

import { slideInRight, slideInLeft, transition, fadeIn } from '../styles/framerMotions';

const useIntersectionObserver = (ref, setInView, threshold) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, setInView, threshold]);
};

const tooltip = (
    <Tooltip id="tooltip">
        Meet the team!
    </Tooltip>
);

export default function Landing() {
    const ref = useRef();
    const ref2 = useRef();
    const ref3 = useRef();

    useEffect(() => {
        Wake();
    }, []);

    const [inView, setInView] = useState(false);
    const [inView2, setInView2] = useState(false);
    const [inView3, setInView3] = useState(false);

    // Set the threshold for each observer
    const threshold = 0.75;

    useIntersectionObserver(ref, setInView, threshold);
    useIntersectionObserver(ref2, setInView2, threshold);
    useIntersectionObserver(ref3, setInView3, threshold);

    return (
        <div className="scrollable vh-100">
            <Helmet>
                <title>unIQ - Welcome</title>
                <meta name="description" content="unIQ is a web application that helps students to prepare for their exams." />
                <meta name="keywords" content="unIQ, exam, preparation" />
                <meta name="author" content="Keelan Matthews, Francois Smith, Ross Tordiffe, Dhairiya Chhipa, Tayla Orsmond" />
            </Helmet>
            <Navbar expand="lg" fixed="top" className="pt-4 px-5">
                {/* brand image */}
                <Navbar.Brand href="#home">
                    <img
                        src="/images/logo.svg"
                        alt="unIQ logo"
                        style={{ width: '5rem' }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to={"/"} className='text-primary fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-sm d-flex justify-content-center align-items-center' style={{ height: '40px', width: '100px' }}>Home</Link>
                        <Link to={"/team"} className='text-info fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-sm d-flex justify-content-center align-items-center me-4' style={{ height: '40px', width: '100px' }}>The Team</Link>
                        <Link to={"/dashboard"} className='text-white fw-bold fs-4 p-0 mb-1 text-decoration-none btn btn-primary btn-sm d-flex justify-content-center align-items-center' style={{ height: '40px', width: '100px' }}>Login</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* Background image */}
            <div className='bg-light position-absolute w-100 h-100 d-flex align-items-center justify-content-center' style={{ zIndex: -1 }}>
                <motion.img
                    className="splash"
                    style={{ width: '90rem' }}
                    src="/images/splash.webp"
                    alt=""
                    variants={fadeIn}
                    initial='hidden'
                    animate='visible'
                    transition={{ ...transition, delay: 0.3 }}
                />
            </div>
            {/* Floating bottom in bottom right corner */}
            <div className='position-absolute bottom-0 end-0 mb-3 me-3'>
                <OverlayTrigger placement="left" overlay={tooltip}>
                    <Link to={"/team"} className="rounded-circle bg-info p-3 d-flex justify-content-center align-items-center">
                        <BsFillPersonFill className="text-white fs-1 m-0 p-0" size="30" />
                    </Link>
                </OverlayTrigger>
            </div>

            <div class="scroll-downs">
                <div class="mousey">
                    <div class="scroller"></div>
                </div>
            </div>

            <Row className='vh-100 mt-5 pt-5'>
                {/* unIQ logo big in the middle with 2 cta */}
                <Col xs={{ span: 5, offset: 1 }} className='mb-5 pb-5'>
                    <div className="d-flex flex-column justify-content-start mt-5 pt-5">
                        <motion.h1
                            className='text-primary fw-bold display-1 mb-4'
                            variants={slideInLeft}
                            initial='hidden'
                            animate='visible'
                            transition={transition}
                        >
                            Studying made easier.
                        </motion.h1>

                        <motion.p
                            className='text-muted fs-2 mb-5 slogan'
                            variants={slideInLeft}
                            initial='hidden'
                            animate='visible'
                            transition={transition}
                            style={{ maxWidth: '650px' }}
                        >
                            Take practice quizzes on specific chapters in a module to test your knowledge, and receive live statistics on your performance.
                        </motion.p>

                        <motion.div
                            className='d-flex mt-4'
                            variants={slideInLeft}
                            initial='hidden'
                            animate='visible'
                            transition={transition}
                        >
                            <Link to={"/dashboard"} className='text-white fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-primary btn-sm d-flex justify-content-center align-items-center me-4' style={{ height: '60px', width: '200px' }}>Login</Link>
                            <Button href="#module-stats" className='text-white fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-info btn-sm d-flex justify-content-center align-items-center' style={{ height: '60px', width: '200px' }}>Learn more</Button>
                        </motion.div>
                    </div>
                </Col>
            </Row>

            <Row className='vh-100 mt-5 pt-5 bg-white' id="module-stats" ref={ref}>
                <Col xs={{ span: 5, offset: 1 }} className="d-flex align-items-center">
                    {/* image */}
                    <motion.img
                        src="/images/module-stats.svg"
                        alt=""
                        variants={slideInLeft}
                        initial='hidden'
                        animate={inView ? 'visible' : 'hidden'}
                        transition={transition}
                        style={{ width: '40rem' }}
                    />
                </Col>

                <Col xs={{ span: 5 }} className='d-flex align-items-center'>
                    {/* text */}
                    <div className="d-flex flex-column justify-content-start mt-5 pt-5">
                        <motion.h1
                            className='text-primary fw-bold display-2 mb-4'
                            variants={slideInRight}
                            initial='hidden'
                            animate={inView ? 'visible' : 'hidden'}
                            transition={{ ...transition, delay: 0.2 }}
                        >
                            Module Statistics
                        </motion.h1>

                        <motion.p
                            className='text-muted fs-2 mb-5 slogan'
                            variants={slideInRight}
                            initial='hidden'
                            animate={inView ? 'visible' : 'hidden'}
                            transition={{ ...transition, delay: 0.4 }}
                            style={{ maxWidth: '650px' }}
                        >
                            View your performance on a specific module, and see which chapters you need to focus on.
                        </motion.p>

                        <motion.div
                            className='d-flex mt-4'
                            variants={slideInRight}
                            initial='hidden'
                            animate={inView ? 'visible' : 'hidden'}
                            transition={{ ...transition, delay: 0.6 }}
                        >
                            <Link to={"/dashboard"} className='text-white fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-primary btn-sm d-flex justify-content-center align-items-center me-4' style={{ height: '60px', width: '200px' }}>Dashboard</Link>
                        </motion.div>
                    </div>
                </Col>
            </Row>

            <Row className='vh-100 pt-5 bg-white' ref={ref2}>
                <Col xs={{ span: 5, offset: 1 }} className="d-flex align-items-center">
                    {/* text */}
                    <div className="d-flex flex-column justify-content-start mt-5 pt-5">
                        <motion.h1
                            className='text-primary fw-bold display-2 mb-4'
                            variants={slideInLeft}
                            initial='hidden'
                            animate={inView2 ? 'visible' : 'hidden'}
                            transition={{ ...transition, delay: 0.2 }}
                        >
                            Chapter quizzes
                        </motion.h1>

                        <motion.p
                            className='text-muted fs-2 mb-5 slogan'
                            variants={slideInLeft}
                            initial='hidden'
                            animate={inView2 ? 'visible' : 'hidden'}
                            transition={{ ...transition, delay: 0.4 }}
                            style={{ maxWidth: '650px' }}
                        >
                            Take practice quizzes on specific chapters in a module to test your knowledge, and receive live statistics on your performance.
                        </motion.p>

                        <motion.div
                            className='d-flex mt-4'
                            variants={slideInLeft}
                            initial='hidden'
                            animate={inView2 ? 'visible' : 'hidden'}
                            transition={{ ...transition, delay: 0.6 }}
                        >
                            <Link to={"/dashboard"} className='text-white fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-primary btn-sm d-flex justify-content-center align-items-center me-4' style={{ height: '60px', width: '200px' }}>Get started</Link>
                        </motion.div>
                    </div>
                </Col>

                <Col xs={{ span: 5 }} className='d-flex align-items-center'>
                    {/* image */}
                    <motion.img
                        src="/images/chapters.svg"
                        alt=""
                        variants={slideInRight}
                        initial='hidden'
                        animate={inView2 ? 'visible' : 'hidden'}
                        transition={transition}
                        style={{ width: '60rem' }}
                    />
                </Col>
            </Row>

            <Row className='vh-100 pt-5 bg-white' ref={ref3}>
                <Col xs={{ span: 5, offset: 1 }} className="d-flex align-items-center">
                    {/* image */}
                    <motion.img
                        src="/images/test.svg"
                        alt=""
                        variants={slideInLeft}
                        initial='hidden'
                        animate={inView3 ? 'visible' : 'hidden'}
                        transition={transition}
                        style={{ width: '40rem' }}
                    />
                </Col>

                <Col xs={{ span: 5 }} className='d-flex align-items-center'>
                    {/* text */}
                    <div className="d-flex flex-column justify-content-start mt-5 pt-5">
                        <motion.h1
                            className='text-primary fw-bold display-2 mb-4'
                            variants={slideInRight}
                            initial='hidden'
                            animate={inView3 ? 'visible' : 'hidden'}
                            transition={{ ...transition, delay: 0.2 }}
                        >
                            Simple quiz system
                        </motion.h1>

                        <motion.p
                            className='text-muted fs-2 mb-5 slogan'
                            variants={slideInRight}
                            initial='hidden'
                            animate={inView3 ? 'visible' : 'hidden'}
                            transition={{ ...transition, delay: 0.4 }}
                            style={{ maxWidth: '650px' }}
                        >
                            Quizzes utilize a clean, simple interface that is easy to use and understand. It also allows for efficient backtracking and indication of unanswered questions.
                        </motion.p>

                        <motion.div
                            className='d-flex mt-4'
                            variants={slideInRight}
                            initial='hidden'
                            animate={inView3 ? 'visible' : 'hidden'}
                            transition={{ ...transition, delay: 0.6 }}
                        >
                            <Link to={"/dashboard"} className='text-white fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-primary btn-sm d-flex justify-content-center align-items-center me-4' style={{ height: '60px', width: '200px' }}>Take me there</Link>
                        </motion.div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
