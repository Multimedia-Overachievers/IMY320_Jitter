import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

export default function Team() {
    return (
        <div className="vh-100">
            <Helmet>
                <title>unIQ - The Team</title>
                <meta name="description" content="unIQ is a web application that helps students to prepare for their exams." />
                <meta name="keywords" content="unIQ, exam, preparation" />
                <meta name="author" content="Keelan Matthews, Francois Smith, Ross Tordiffe, Dhairiya Chhipa, Tayla Orsmond" />
            </Helmet>
            <Row>
                
            </Row>
        </div>
    )
}