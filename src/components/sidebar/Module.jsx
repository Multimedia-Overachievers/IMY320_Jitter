import React from 'react';
import { BiCoffeeTogo, BiImage, BiTerminal, BiBrain } from 'react-icons/bi';
import { CgWebsite } from 'react-icons/cg';
import { LuFigma } from 'react-icons/lu';
import { motion } from 'framer-motion';
import { slideInRight, transition } from '../../styles/framerMotions';

export default function Module({ index, name, completion, icon, active}) {
    /**
     * This function returns a FontAwesomeIcon component based on the icon name passed in
     * @param {string} iconName 
     * @returns FontAwesomeIcon Component
     */
         const getIconComponent = (iconName) => {
            switch (iconName) {
                case 'Coffee':
                    return <BiCoffeeTogo size="70" />
                case 'Terminal':
                    return <BiTerminal size="70" />
                case 'Figma':
                    return <LuFigma size="70" />
                case 'Brain':
                    return <BiBrain size="70" />
                case 'Website':
                    return <CgWebsite size="70" />
                default:
                    return <BiCoffeeTogo size="70" />
            }
        }

    return (
        <motion.div 
            role="button" 
            className={`d-flex p-4 shadow rounded mb-3 align-items-center ${active && 'bg-primary'}`}
            variants={slideInRight}
            initial='hidden'
            animate='visible'
            transition={{...transition, delay: 0.7 + (0.1 * index)}}
        >
            <div className={active ? 'text-white' : 'text-primary'}>
                {getIconComponent(icon)}
            </div>
            <div className='ms-4'>
                <h4 className={`p-0 m-0 ${active ? 'text-white' : 'text-dark'}`}>{name}</h4>
                <small className={`d-block ${active ? 'text-white' : 'text-secondary'}`}>Completion</small>
                <small className={active ? 'text-white' : 'text-secondary'}>{completion}%</small>
            </div>
        </motion.div>
    )
}
