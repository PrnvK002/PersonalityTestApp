import React,{useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addName } from '../state/reducers/testReducer';

const NameModal = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [name , setName] = useState('');
    const [err,setError] = useState('');
    const handleSubmit = () => {
        if(name.length){
            dispatch(addName(name));
            handleClose();
        }else{
            setError('Please fill your name')
        }
    }

    const modalClose = () => {
        if(name.length){
            handleClose();
        }else{
            setError('Please fill your name')
        }
    }

    return (
        <>
            <Modal show={show} onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Enter your Name </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { err && <p style={{ color : 'red' }} > {err} </p> }
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name of the user</Form.Label>
                        <Form.Control type="text" placeholder="Name of the User" onChange={ (e) =>{ setName(e.target.value) } } />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NameModal
