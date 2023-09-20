import React from 'react';
import { motion } from 'framer-motion';
import { slideInBottom, fadeIn, transition } from '../../styles/framerMotions';

export default function OverallStatistics({ totalHours, contentCovered }) {
    return (
        <div>
            <motion.h3 
                className='text-dark'
                variants={fadeIn}
                initial='hidden'
                animate='visible'
                transition={{...transition, delay: 0.3}}
            >
                Statistics
            </motion.h3>
            <div className="d-flex justify-content-between">
                <motion.div 
                    className='rounded shadow p-3 w-50 me-4'
                    variants={slideInBottom}
                    initial='hidden'
                    animate='visible'
                    transition={{...transition, delay: 0.8}}
                >
                    <p className='m-0 p-0 text-secondary mb-2'>Total hours</p>
                    <h2 className='m-0 p-0 text-primary fw-bold'>{totalHours}</h2>
                </motion.div>
                <motion.div 
                    className='rounded shadow p-3 w-50'
                    variants={slideInBottom}
                    initial='hidden'
                    animate='visible'
                    transition={{...transition, delay: 0.9}}
                >
                    <p className='m-0 p-0 text-secondary mb-2'>Content covered</p>
                    <h2 className='m-0 p-0 text-primary fw-bold'>{contentCovered}%</h2>
                </motion.div>
            </div>
        </div>
    )
}
