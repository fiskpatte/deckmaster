import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react';
import './ConfirmationModal.css'

export default class ConfirmationModal extends Component {
    render() {
        let {open,centered,registrationKey,deckNumber,laneNumber,frameNumber,handleAction} = this.props
        return (
            <Modal open={open} centered={centered}>
                <Modal.Header>Confirm vehicle</Modal.Header>
                <Modal.Content>
                    <p>{`Registration number: ${registrationKey}`}</p>
                    <p>{`Deck: ${deckNumber}`}</p>
                    <p>{`Lane: ${laneNumber}`}</p>
                    <p>{`Frame: ${frameNumber}`}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => handleAction(false)}>Cancel</Button>
                    <Button positive onClick={() => handleAction(true)}>Confirm</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
