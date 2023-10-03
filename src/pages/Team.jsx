import React from 'react';
import { Row, Col, Container, Navbar, Nav, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { slideInRight, slideInLeft, transition } from '../styles/framerMotions';

export default function Team() {
    return (
        <div className="vh-100 bg-light">
            <Helmet>
                <title>unIQ - The Team</title>
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
                    <Link to={"/dashboard"} className='text-info fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-sm d-flex justify-content-center align-items-center me-4' style={{ height: '40px', width: '100px' }}>Home</Link>
                        <Link to={"/dashboard"} className='text-info fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-sm d-flex justify-content-center align-items-center me-4' style={{ height: '40px', width: '100px' }}>Dashboard</Link>
                        <Link to={"/team"} className='text-primary fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-sm d-flex justify-content-center align-items-center me-4' style={{ height: '40px', width: '100px' }}>Team</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container className="pt-5">
                <motion.h1
                    className="text-primary fw-bold fs-1 py-5"
                    variants={slideInRight}
                    initial='hidden'
                    animate='visible'
                    transition={{ ...transition, delay: 0.1 }}
                >
                    Meet the team
                </motion.h1>
                <Row className='d-flex align-items-center justify-content-center'>
                    <Card image='/images/keelan.jpg' name='Keelan Matthews' role='Lead Frontend Developer' cta='Portfolio' link='https://keelanmatthews.com' slideLeft={true} />
                    <Card image='/images/francois.jpeg' name='Francois Smith' role='Lead Backend Developer' cta='Portfolio' link='https://francois-smith.com' slideLeft={false} />
                    <Card image='/images/ross.jpeg' name='Ross Tordiffe' role='Backend Developer' cta='GitHub' link='https://github.com/Ross-Tordiffe' slideLeft={true} />
                    <Card image='/images/tayla.jpeg' name='Tayla Orsmond' role='Frontend Developer' cta='GitHub' link='https://github.com/tayla-orsmond' slideLeft={false} />
                    <Card image='/images/dhairiya.jpeg' name='Dhairiya Chhipa' role='Content' cta='GitHub' link='https://github.com/DhairiyaChhipa' slideLeft={true} />
                </Row>
            </Container>
        </div>
    )
}

const Card = ({ image, name, role, cta, link, slideLeft }) => (
    <motion.div
        className="bg-white rounded shadow m-1 mb-4 me-4 p-4 d-flex"
        variants={slideLeft ? slideInLeft : slideInRight}
        initial='hidden'
        animate='visible'
        transition={transition}
        style={{ width: '500px' }}
    >
        <img src={image} style={{ width: '10rem' }} className="rounded" alt="..." />
        <div className="card-body ms-4 d-flex flex-column justify-content-between align-items-end">
            <div>
                <h5 className="text-primary fs-2">{name}</h5>
                <p className="fs-3">{role}</p>
            </div>

            <Button href={link} target="_blank" className='text-white fw-bold p-0 mb-1 text-decoration-none btn btn-primary btn-sm d-flex justify-content-center align-items-center' style={{ height: '40px', width: '100px' }}>{cta}</Button>
        </div>
    </motion.div>
)