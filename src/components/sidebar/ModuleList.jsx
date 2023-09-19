import React, { useState, useEffect } from 'react';
import Module from './Module';

import { GetAllQuestions } from '../../services/api-requests';

export default function ModuleList({ modules, setModule }) {

    const setActiveModule = (index) => {
        modules.forEach((module, i) => {
            module.active = i === index;
        });

        setModule(modules[index]);
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
            if(question?.finished) {
                progress++;
            }
        });
    
        return Math.round(Math.round((progress / chapter.questions?.length) * 100)/10) * 10;
    }


    return (
        <div>
            <h3 className='text-dark'>Modules</h3>

            {/* Modules */}
            {modules?.map((module, index) => (
                <div onClick={() => setActiveModule(index)} key={index}>
                    <Module name={module.name} completion={GetOverallProgress(module)} icon={module.icon} active={module.active} />
                </div>
            ))}
        </div>
    )
}