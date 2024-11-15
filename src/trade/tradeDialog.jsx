import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export function TradeDialog(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const navigate = useNavigate();

    function resetForm(){
        setShow(false);
        props.clearForm();
    }

    if(props.message){
        if(props.error){
            // Issue in order
            return (
                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                    <Modal.Header>
                        <Modal.Title>Error in order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{props.message}</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => navigate('/')} variant='outline-danger'>Return to home</Button>
                        <Button onClick={() => resetForm()} variant='outline-danger'>Reset Form</Button>
                    </Modal.Footer>
                </Modal>
            );
        }
        else {
            // Successful order
            return (
                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                    <Modal.Header>
                        <Modal.Title>Order Successful!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{props.message} Click the button below to return to the home page and see your updated profile.</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => navigate('/')} variant='outline-success'>Return to home</Button>
                    </Modal.Footer>
                </Modal>
            ) ;
        }
    }
}