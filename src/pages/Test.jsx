import React, { useState, useEffect } from 'react';
import Question from '../components/test/Question';

import data from '../backend/json/questions.json';

export default function Test() {

    const [module, setModule] = useState(null);

    const isExam = false;

    useEffect(() => {
        // Set the initial state once the data is loaded
        if (data && data.data && data.data.length > 0) {
            // do this dynamically
            setModule(data.module[0]);
        }
    }, []);

    return (
        <div className="vh-100">
            <div className="p-5 m-4">
                {/* Test header */}
                <div className='d-flex justify-content-between'>
                    <div>
                        <h4 className='text-secondary'>{isExam ? "Exam" : "Practice Test"}</h4>
                        <h1 className='text-primary fw-bold display-4'>{module?.name}</h1>
                    </div>

                    {/* log out */}
                </div>
                
                {/*  Leave test */}

                {/* Test heading with time bar */}

                {/* Question */}
                <Question question={module?.questions[0].question} answers={module?.questions[0].answers} />
            </div>
        </div>
    )
}