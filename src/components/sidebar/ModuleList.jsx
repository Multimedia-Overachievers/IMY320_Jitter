import React, { useState, useEffect } from 'react';
import Module from './Module';
import { motion } from 'framer-motion';
import { fadeIn, transition } from '../../styles/framerMotions';
import { Spinner } from 'react-bootstrap';

import { GetAllQuestions } from '../../services/api-requests';

export default function ModuleList({ modules, setModule }) {

    const setActiveModule = (index) => {
        modules.forEach((module, i) => {
            module.active = i === index;
        });

        setModule(index);
    }

    var [questions, setQuestions] = useState(null);

    useEffect(() => {
        GetAllQuestions().then((response) => {
            setQuestions(response.data);
        });
    }, []);

    const GetOverallProgress = (module) => {
        var progress = 0;
        var moduleQuestions = questions?.module[module?.index];

        moduleQuestions?.chapters.forEach(chapter => {
            progress += GetProgress(chapter);
        });

        return progress / moduleQuestions?.chapters.length;
    }

    const GetProgress = (chapter) => {
        var progress = 0;

        chapter.questions.forEach(question => {
            if (question?.finished) {
                progress++;
            }
        });

        return Math.round(Math.round((progress / chapter.questions?.length) * 100) / 10) * 10;
    }


    return (
        <div className='h-75'>
            <motion.h3
                className='text-dark mt-5'
                variants={fadeIn}
                initial='hidden'
                animate='visible'
                transition={{ ...transition, delay: 0.3 }}
            >
                Modules
            </motion.h3>
            <div>
                {
                    !modules ?
                        <span className='d-flex justify-content-center align-items-center h-100'>
                            <Spinner animation="border" variant="primary" />
                        </span>
                        :
                        modules.map((module, index) => (
                            <div onClick={() => setActiveModule(index)} key={index}>
                                <Module index={index} name={module.name} completion={GetOverallProgress(module)} icon={module.icon} active={module.active} />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}