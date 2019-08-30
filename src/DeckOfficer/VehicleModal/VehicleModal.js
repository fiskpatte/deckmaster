import React, { Component } from 'react'
import { Modal, Table, Button } from 'semantic-ui-react';
import './VehicleModal.css'

export default class VehicleModal extends Component {
    render() {
        let {open,centered,registrationKey,handleAction} = this.props
        return (
            <Modal open={open} centered={centered}>
                <Modal.Header>Vehicle info</Modal.Header>
                <Modal.Content>
                    <Table celled>
                        <Table.Body>
                            <InfoRow label={"Registration number"} value={registrationKey} />
                            <InfoRow label={"Type"} value={"Truck"} />
                            <InfoRow label={"Length"} value={"8.0 m"} />
                            <InfoRow label={"Width"} value={"2.1 m"} />
                            <InfoRow label={"Height"} value={"3.2 m"} />
                            <InfoRow label={"Weigth"} value={"18 t"} />
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => handleAction(false)}>Cancel</Button>
                    <Button positive onClick={() => handleAction(true)}>Confirm</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

function InfoRow({ label, value }){
    return (
        <Table.Row>
            <Table.Cell className="InfoRowLabel">{label}</Table.Cell>
            <Table.Cell className="InfoRowValue">{value}</Table.Cell>
        </Table.Row>
    )
}