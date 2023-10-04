import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { slideInRight, transition, slideInBottom } from '../styles/framerMotions';

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
                    <Link to={"/"} className='text-info fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-sm d-flex justify-content-center align-items-center me-4' style={{ height: '40px', width: '100px' }}>Home</Link>
                        <Link to={"/dashboard"} className='text-info fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-sm d-flex justify-content-center align-items-center me-4' style={{ height: '40px', width: '100px' }}>Dashboard</Link>
                        <Link to={"/team"} className='text-primary fw-bold fs-3 p-0 mb-1 text-decoration-none btn btn-sm d-flex justify-content-center align-items-center me-4' style={{ height: '40px', width: '100px' }}>Team</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="pt-5 px-5 mx-5">
                <motion.h1
                    className="text-primary fw-bold fs-1 py-5"
                    variants={slideInRight}
                    initial='hidden'
                    animate='visible'
                    transition={{ ...transition, delay: 0.1 }}
                >
                    Meet the team
                </motion.h1>
                <div className='d-flex'>
                    <Card image='/images/keelan.webp' name='Keelan Matthews' role='Lead Frontend Developer' cta='Portfolio' link='https://keelanmatthews.com' delay={0.2}  />
                    <Card image='/images/francois.webp' name='Francois Smith' role='Lead Backend Developer' cta='Portfolio' link='https://francois-smith.com' delay={0.4} />
                    <Card image='/images/ross.webp' name='Ross Tordiffe' role='Backend Developer' cta='GitHub' link='https://github.com/Ross-Tordiffe' delay={0.6} />
                    <Card image='/images/tayla.webp' name='Tayla Orsmond' role='Frontend Developer' cta='GitHub' link='https://github.com/tayla-orsmond' delay={0.8} />
                    <Card image='/images/dhairiya.webp' name='Dhairiya Chhipa' role='Content' cta='GitHub' link='https://github.com/DhairiyaChhipa' delay={1}  />
                </div>
            </div>
        </div>
    )
}

const Card = ({ image, name, role, cta, link, delay }) => (
    <motion.div
        className="bg-white rounded shadow m-1 mb-4 me-4 p-4"
        variants={slideInBottom}
        initial='hidden'
        animate='visible'
        transition={{ ...transition, delay }}
        style={{width: '20%'}}
    >
        <img src={image} className="rounded w-100" alt="..." />
        <div className="card-body">
            <div>
                <h5 className="text-primary fs-2 mt-4">{name}</h5>
                <p className="fs-3">{role}</p>
            </div>

            <Button href={link} target="_blank" className='text-white fw-bold p-0 mb-1 text-decoration-none btn btn-primary btn-sm d-flex justify-content-center align-items-center' style={{ height: '40px', width: '100px' }}>{cta}</Button>
        </div>
    </motion.div>
)