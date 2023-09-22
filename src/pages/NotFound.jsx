import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { slideInRight, slideInLeft, transition } from '../styles/framerMotions';
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <div className="pt-5 mt-5 text-center">
                <h1 className='text-primary mb-4 display-4 fw-bold'>Bunking class?</h1>
                <h2 className='text-info mb-5 pb-5'>No studying can take place here!</h2>

                <img src="/images/404.svg" style={{ height: '50vh' }} alt="" />

                <div className='d-flex justify-content-center mt-4 w-100'>
                    <Link to="/" className='text-white fw-bold p-0 mb-1 text-decoration-none btn btn-primary btn-lg d-flex justify-content-center align-items-center' style={{ height: '50px', width: '300px' }}>Go Home</Link>
                </div>

            </div>
        </Container>
    )
}