import React, { Component } from 'react'
import { Step, Modal, Button, Segment } from 'semantic-ui-react';
import RegistrationKeyInput from './RegistrationKeyInput'
import { DECK_OFFICER_STEP } from './../utils/constants'
import DeckPicker from './DeckPicker'
import LanePicker from './LanePicker'
import VehicleModal from './VehicleModal/VehicleModal';
export default class DeckOfficer extends Component {

    constructor(props){
        super(props);
        this.state = {
          registrationKey:"",
          deckNumber:"",
          laneNumber:"",
          frameNumber:"",
          modalOpen: false,
          currentStep:DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT,
          vehicleModalOpen: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.vehicleModalConfirm = this.vehicleModalConfirm.bind(this)
        this.vehicleModalCancel = this.vehicleModalCancel.bind(this)

        this.steps = [
            {id:DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT, title:'Reg nr'},
            {id:DECK_OFFICER_STEP.DECK_PICKER, title:'Deck'},
            {id:DECK_OFFICER_STEP.LANE_PICKER, title:'Lane'}
        ]
    }
    
    renderStepComponent(){
        switch(this.state.currentStep){
            case DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT:
                return <RegistrationKeyInput onSubmit={this.handleSubmit}/>
            case DECK_OFFICER_STEP.DECK_PICKER:
                return <DeckPicker onSubmit={this.handleSubmit}/>
            case DECK_OFFICER_STEP.LANE_PICKER:
                return <LanePicker onSubmit={this.handleSubmit}/>
            default:
                return null
        }
    }

    handleSubmit(firstInput,secondInput = ""){
        console.log("kommer hit! this: ", this)

        if(firstInput === "") return
        console.log("kommer hitasd! this: ", this)

        switch(this.state.currentStep){
            case DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT:
                
                this.setState({vehicleModalOpen: true, registrationKey: firstInput, currentStep: DECK_OFFICER_STEP.REGISTRATION_KEY_CONFIRM})

                break;
            case DECK_OFFICER_STEP.REGISTRATION_KEY_CONFIRM:
                this.setState({currentStep:DECK_OFFICER_STEP.DECK_PICKER})
                break;

            case DECK_OFFICER_STEP.DECK_PICKER:
                this.setState({currentStep:DECK_OFFICER_STEP.LANE_PICKER,deckNumber:firstInput})
                break;
            case DECK_OFFICER_STEP.LANE_PICKER:
                    if(secondInput === "") return
                    this.setState({modalOpen:true,laneNumber:firstInput,frameNumber:secondInput})
                    break;
            default:
                return null
        }
    }

    handleClick(event,{step}){
        switch(step){
            case DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT:
                this.setState({ currentStep:DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT,
                                registrationKey:"",
                                deckNumber:"",
                                laneNumber:"",
                                frameNumber:""
                            })
                break;
            case DECK_OFFICER_STEP.DECK_PICKER:
                this.setState({ currentStep:DECK_OFFICER_STEP.DECK_PICKER,
                                deckNumber:"",
                                laneNumber:"",
                                frameNumber:""
                            })
                break;
            case DECK_OFFICER_STEP.LANE_PICKER:
                    this.setState({currentStep:DECK_OFFICER_STEP.LANE_PICKER,laneNumber:"",frameNumber:""})
                    break;
            default:
                return null
        }
    }

    isStepDisabled(stepID){
        let {registrationKey, deckNumber} = this.state
        switch(stepID){
            case DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT:
                return false
            case DECK_OFFICER_STEP.DECK_PICKER:
                return registrationKey === ""
            case DECK_OFFICER_STEP.LANE_PICKER:
                return deckNumber === ""
            default:
                return true
        }
    }
    stepDescription(stepID){
        let {registrationKey, deckNumber, laneNumber, frameNumber} = this.state
        switch(stepID){
            case DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT:
                return registrationKey
            case DECK_OFFICER_STEP.DECK_PICKER:
                return deckNumber
            case DECK_OFFICER_STEP.LANE_PICKER:
                return `${laneNumber} ${frameNumber}`
            default:
                return true
        }
    }
    closeModal(confirmData){
        if(confirmData){
            this.setState({ currentStep:DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT,
                registrationKey:"",
                deckNumber:"",
                laneNumber:"",
                frameNumber:"",
                modalOpen:false
            })
        } else{
            this.setState({modalOpen:false})
        }
    }

    vehicleModalCancel(){
        this.setState({
            vehicleModalOpen: false,
            currentStep: 1,
            registrationKey: ""
        })
    }

    vehicleModalConfirm(){
        this.setState({
            vehicleModalOpen: false
        })
        this.handleSubmit(this.state.registrationKey)
    }

    render() {
        let {currentStep,registrationKey,deckNumber,frameNumber,laneNumber, modalOpen, vehicleModalOpen} = this.state
        return (
            <React.Fragment>
                <Segment>

                    <Step.Group>
                        {this.steps.map((step,ix) => 
                            <Step   key={ix}
                                    step={step.id}
                                    active={currentStep === step.id}
                                    disabled={this.isStepDisabled(step.id)}
                                    onClick={this.handleClick}
                                >
                                <Step.Content>
                                    <Step.Title>{step.title}</Step.Title>
                                    <Step.Description>{this.stepDescription(step.id)}</Step.Description>
                                </Step.Content>
                            </Step>
                        )}                    
                    </Step.Group>
                    {this.renderStepComponent()}
                    <Modal open={modalOpen} centered={false}>
                        <Modal.Header>Confirm</Modal.Header>
                        <Modal.Content>
                            <p>{`Registration number: ${registrationKey}`}</p>
                            <p>{`Deck: ${deckNumber}`}</p>
                            <p>{`Lane: ${laneNumber}`}</p>
                            <p>{`Frame: ${frameNumber}`}</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative onClick={() => this.closeModal(false)}>Cancel</Button>
                            <Button positive onClick={() => this.closeModal(true)}>Confirm</Button>
                        </Modal.Actions>
                    </Modal>

                    <Modal open={vehicleModalOpen} centered={false}>
                        <VehicleModal 
                            registrationKey={this.state.registrationKey} 
                            cancel={this.vehicleModalCancel}
                            confirm={this.vehicleModalConfirm} />
                    </Modal>
                </Segment>

            </React.Fragment>
        )
    }
}
