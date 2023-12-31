import React, { useState } from 'react';
import Chapter from './Chapter';

import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { MdOutlineTimer } from 'react-icons/md';
import { PiWarningFill } from 'react-icons/pi';
import { Button, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { slideInLeft, transition } from '../../styles/framerMotions';

export default function Chapters({ module }) {
    const [modalShow, setModalShow] = useState(false);

    const ShowModuleError = () => {
        toast.error('Please select at least one chapter', {
            style: {
                padding: '16px',
                color: '#4e5662',
            },
            iconTheme: {
                primary: '#e07b7b',
            },
            duration: 3000,
        });
    }

    return (
        <>
            <div className='mt-5 h-100'>
                <div><Toaster/></div>
                <div className="d-flex justify-content-between">
                    <motion.div
                        className="d-flex align-items-center"
                        variants={slideInLeft}
                        initial='hidden'
                        animate='visible'
                        transition={{ ...transition, delay: 0.2 }}
                    >
                        <h1 className='text-primary me-5'>Chapters</h1>
                        {/* Take exam */}
                        <div
                            className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                            style={{ height: '40px', width: '100px' }}
                            onClick={() => setModalShow(true)}
                        >
                            <p className='text-white fw-bold p-0 mb-1 text-decoration-none'>Take exam</p>
                        </div>
                    </motion.div>
                </div>

                <div>
                    {
                        !module ?
                            <span className='d-flex justify-content-center align-items-center mt-5 pt-5'>
                                <Spinner animation="border" variant="primary" />
                            </span>
                            :
                            module.chapters.map((chapter, index) => (
                                <Chapter key={index} moduleIndex={module.index} index={index} chapter={chapter.chapter} description={chapter.description} />
                            ))
                    }
                </div>
            </div>

            {/* Modal */}
            <ExamChaptersModal
                errorCallback={ShowModuleError}
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                }}
                chapters={module?.chapters}
                moduleindex={module?.index}
            />
        </>
    )
}

function ExamChaptersModal({ errorCallback, ...props }) {
    const navigate = useNavigate();

    const [chapters, setChapters] = useState([]);
    const [timeLimit, setTimeLimit] = useState(false);

    const startExam = () => {
        if(chapters.length === 0) {
            errorCallback();
            return;
        }

        navigate('/dashboard/test/'+props.moduleindex+'/5', { state: {
            duration: timeLimit ? chapters.length * 900 : -1,
            exam: true,
            chapters: chapters
        }});

        props.onHide();
    }

    const ToggleChapter = (chapter, index) => {
        var tempChapters = [...chapters];
        const isSelected = tempChapters.includes(index);

        if (isSelected) {
            // If already selected, remove it
            tempChapters.splice(tempChapters.indexOf(index), 1);
        } else {
            // If not selected, add it
            tempChapters.push(index);
        }

        setChapters(tempChapters);
    }

    //<Link to={`test/${moduleIndex}/${index}`} state={{duration: 600}} className='text-white fw-bold p-0 mb-1 text-decoration-none btn btn-primary btn-sm d-flex justify-content-center align-items-center' style={{ height: '40px', width: '100px' }}>Take quiz</Link>

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='p-5'>
                <div onClick={props.onHide}>
                    <BiLeftArrowAlt className='text-secondary mb-3' size={30} />
                </div>
                <h2 className='text-dark'>Select the chapters you want to be examined on</h2>

                <Form>
                    {/* Chapters */}
                    <Form.Group className='chapter-form'>
                        {
                            props.chapters?.map((chapter, index) => (
                                <div
                                    key={index}
                                    className={`shadow p-3 bg-${chapters.includes(index) ? 'primary' : 'white'} text-${chapters.includes(index) ? 'white' : 'dark'} fs-2 my-4 rounded`}
                                    onClick={() => ToggleChapter(chapter, index)}
                                >
                                    <Form.Check
                                        type="checkbox"
                                        label={chapter.chapter}
                                        checked={chapters.includes(index)}
                                        onChange={() => ToggleChapter(chapter, index)}
                                    />
                                </div>
                            ))
                        }
                    </Form.Group>

                    {/* Time limit check box */}
                    <Form.Group className='d-flex align-items-center fs-3 mt-4'>
                        <MdOutlineTimer className='text-primary me-3' size={30} />
                        <Form.Check type="checkbox" label="Time limit" reverse onChange={(e) => setTimeLimit(e.target.checked)} />
                    </Form.Group>
                </Form>

                {/* Disclaimer */}
                <div className="d-flex justify-content-center mt-4">
                    <PiWarningFill className='me-1 mt-1 text-secondary' size={20} />
                    <p className='text-secondary'>This will not contribute towards your module stats</p>
                </div>
                <div className="d-flex justify-content-end">
                    <Button size="lg" className='mt-4 text-white' onClick={startExam}>Start exam</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
