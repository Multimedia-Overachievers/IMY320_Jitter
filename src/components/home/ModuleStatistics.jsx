import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { formatMinutes, getAverage } from '../../utils/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaughBeam, faFaceMeh, faFaceSurprise } from '@fortawesome/free-solid-svg-icons';
import { getAverageColor } from '../../utils/functions';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { BarChart } from "./BarChart";

import questions from '../../backend/json/questions.json';

export const Data = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234
    }
  ];

Chart.register(CategoryScale);

export default function ModuleStatistics({ module, timeSpent }) {

    /**
     * This function returns a FontAwesomeIcon component based on the average passed in
     * @param {float} average 
     * @returns FontAwesomeIcon Component
     */
    const getEmotionComponent = (average) => {
        if (average < 50) {
            return <FontAwesomeIcon icon={faFaceSurprise} className='text-danger' size="5x" />
        } else if (average < 70) {
            return <FontAwesomeIcon icon={faFaceMeh} className='text-warning' size="5x" />
        } else {
            return <FontAwesomeIcon icon={faFaceLaughBeam} className='text-success' size="5x" />
        }
    }

    // Convert the moduleOverview.chapters array into an array of chapter labels
    const getChapterLabels = () => {
        const labels = [];
        console.log(module?.chapters.length);

        for (let i = 0; i < module?.chapters.length; i++) {
            labels.push(`Ch${i + 1}`);
        }

        console.log(labels);

        return labels;
    }

    // Chartjs data that will be used to display the chart. Specifically, the progress per chapter
    const data = {
        labels: getChapterLabels(),
        datasets: [
            {
                label: 'Progress',
                data: module?.chapters,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };
    
    const GetProgress = (chapter) => {
        var progress = 0;

        chapter.questions.forEach(question => {
            if(question?.finished) {
                progress++;
            }
        });
        return Math.round((progress / chapter.questions?.length) * 100);
    }

    const GetCompletedChapters = () => {
        var completed = 0;

        var moduleQuestions = questions?.module[module?.index];
        moduleQuestions?.chapters.forEach(chapter => {
            if(GetProgress(chapter) === 100) {
                completed++;
            }
        });

        return completed;
    }

    const GetAverageScore = () => {
        var scores = [];

        module?.chapters.forEach(chapter => {
            chapter.scores.forEach(score => {
                scores.push(score);
            });
        });
        
        return scores;
    }

    const [chartData, setChartData] = useState(
        {
            labels: [],
            datasets: []
        }
    );
    setChartData();

    return (
        <Row>
            <Col lg={6}>
                <div className='bg-white rounded shadow m-1 p-3'>
                    <div>
                        <p className='text-secondary mb-4'>Overview</p>
                        <div>
                            {
                                // chartData.labels && <BarChart data={chartData} />
                            }
                        </div>
                    </div>
                </div>
            </Col>
            <Col lg={6}>
                <Row>
                    <Col>
                        <div className='bg-white rounded shadow m-1 p-3'>
                            <p className='text-secondary mb-4'>Completed chapters</p>
                            <h1 className='text-primary fw-bold text-center'>{GetCompletedChapters()} / {module?.chapters.length}</h1>
                        </div>
                    </Col>
                    <Col>
                        <div className='bg-white rounded shadow m-1 p-3'>
                            <p className='text-secondary mb-4'>Overall time spent</p>
                            <h1 className='text-primary fw-bold text-center'>{formatMinutes(timeSpent)}</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-between align-items-center bg-white rounded shadow m-1 mt-4 p-3'>
                            <div>
                                <p className='text-secondary mb-4'>Average score</p>
                                <h1 className={`
                                    text-${getAverageColor(getAverage(GetAverageScore()))} 
                                    fw-bold
                                    `}>
                                        {getAverage(GetAverageScore())}%
                                </h1>
                            </div>
                            <div>
                                {getEmotionComponent(getAverage(GetAverageScore()))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
