import React, { Component } from 'react'
import { Step, Modal, Button } from 'semantic-ui-react';
import RegistrationKeyInput from './RegistrationKeyInput'
import { DECK_OFFICER_STEP } from './../utils/constants'
import DeckPicker from './DeckPicker'
import LanePicker from './LanePicker'
export default class DeckOfficer extends Component {

    constructor(props){
        super(props);
        this.state = {
          registrationKey:"",
          deckNumber:"",
          laneNumber:"",
          frameNumber:"",
          modalOpen: false,
          currentStep:DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.steps = [
            {id:DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT, title:'Registration'},
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
        if(firstInput === "") return
        switch(this.state.currentStep){
            case DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT:
                this.setState({currentStep:DECK_OFFICER_STEP.DECK_PICKER,registrationKey:firstInput})
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
        }else{
            this.setState({modalOpen:false})
        }
    }
    render() {
        let {currentStep,registrationKey,deckNumber,frameNumber,laneNumber, modalOpen} = this.state
        return (
            <React.Fragment>
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
                <Modal open={modalOpen}>
                    <Modal.Header>Confirm</Modal.Header>
                    <Modal.Content>
                        <p>{`Registration Key: ${registrationKey}`}</p>
                        <p>{`Deck: ${deckNumber}`}</p>
                        <p>{`Lane: ${laneNumber}`}</p>
                        <p>{`Frame: ${frameNumber}`}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.closeModal(false)}>Cancel</Button>
                        <Button positive onClick={() => this.closeModal(true)}>Confirm</Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}
