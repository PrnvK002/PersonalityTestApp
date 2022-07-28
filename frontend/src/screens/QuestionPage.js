import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import NameModal from '../components/NameModal';
import { addAnswer, getQuestion, submitTest } from '../state/reducers/testReducer';
import { Loader } from '../components/Loader';

export const QuestionPage = () => {
    const [number, setNumber] = useState(0);
    const dispatch = useDispatch();
    const question = useSelector((state) => state.testReducer.question);
    const loading = useSelector((state) => state.testReducer.loading);
    //=========== Name modal =============
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        dispatch(getQuestion(number));
    }, [dispatch,number])

    const handleClick = (type) => {
        setNumber(number+1);
        let obj = {
            question,
            answer : type
        }
        dispatch(addAnswer(obj));
    }

    useEffect(() => {
      if(number === 13 ){
          dispatch(submitTest());
      }
    }, [number,dispatch])
    

    return (
        <>
            <NameModal show={show} handleClose={handleClose} />
            <Container>
                <div className='questionSection' >
                    <div className='questionCard' >
                        { loading && <Loader /> }
                        <h3> {question.questionName} </h3>
                    </div>
                </div>
                <div className='answerSection' >
                    <button className='answerButton' onClick={ () => { handleClick('stronglyDisagree') } }>
                        Strongly Disagree
                    </button>
                    <button className='answerButton' onClick={ () => { handleClick('disagree') } } >
                        Disagree
                    </button>
                    <button className='answerButton' onClick={ () => { handleClick('neitherAgreeNotDisagree') } }>
                    </button>
                    <button className='answerButton' onClick={ () => { handleClick('agree') } } >
                        Agree
                    </button>
                    <button className='answerButton' onClick={ () => { handleClick('stronglyAgree') } }>
                        Strongly Agree
                    </button>
                </div>
            </Container>
        </>
    )
}
