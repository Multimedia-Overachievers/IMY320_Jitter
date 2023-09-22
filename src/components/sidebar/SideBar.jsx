import React, { useState, useEffect} from 'react';
import ModuleList from './ModuleList';
import OverallStatistics from './OverallStatistics';
import { formatSeconds } from '../../utils/functions';

import { GetAllQuestions } from '../../services/api-requests';

export default function SideBar({ modules, setModule }) {
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        GetAllQuestions().then((response) => {
            setQuestions(response.data);
        });
    }, []);

    const GetProgressModule = (module) => {
        var progress = 0;

        var moduleQuestions = questions?.module[module?.index];
        moduleQuestions?.chapters.forEach(chapter => {
            progress += GetProgressChapter(chapter);
        });

        return progress / moduleQuestions?.chapters.length;
    }

    const GetProgressChapter = (chapter) => {
        var progress = 0;

        chapter.questions.forEach(question => {
            if(question?.finished) {
                progress++;
            }
        });

        return Math.round((progress / chapter.questions?.length) * 100);
    }

    const GetOverallProgress = () => {
        var progress = 0;
    
        modules?.forEach(module => {
            progress += GetProgressModule(module);
        });

        //round to 2 decimal places
        return Math.round((progress / modules?.length) * 10) / 10;
    }

    const GetOverallTime = () => {
        var time = 0;

        modules?.forEach(module => {
            time += module?.timeSpent;
        });

        return time;
    }

    return (
        <div className='vh-100 p-5 pb-3 d-flex flex-column justify-content-between' style={{backgroundColor: '#FCFDFE'}}>
            {/* Logo */}
            <div className='d-flex justify-content-center'>
                <img src='images/logo.svg' alt='logo' className='img-fluid' />
            </div>

            {/* Module list */}
            <ModuleList modules={modules} setModule={setModule} />

            {/* Overall statistics */}
            <OverallStatistics totalHours={formatSeconds(GetOverallTime())} contentCovered={GetOverallProgress()} />

            <small className='text-secondary text-center p-0 m-0'>jitter co.</small>
        </div>
    )
}
