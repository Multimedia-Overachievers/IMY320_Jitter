import React from 'react';
import { motion } from 'framer-motion';
import { slideInBottom, transition } from '../../styles/framerMotions';

export default function QuestionBar({ questionData, SelectEvent }) {
    return (
        <>
            <div className='d-flex justify-content-between w-100 mt-5'>
                {questionData?.map((question, index) => (
                    <motion.div 
                        key={index} 
                        className={`position-relative pointer rounded-1 p-2 mx-1 bg-${question.completed ? 'primary' : 'secondary'} flex-grow-1`} 
                        onClick={() => SelectEvent(index)}
                        variants={slideInBottom}
                        initial='hidden'
                        animate='visible'
                        transition={{...transition, delay: 0.4 + index * 0.03}}
                    >
                        {question.active && <div className="triangle"></div>}
                    </motion.div>
                ))}
            </div>
        </>
    )
}
