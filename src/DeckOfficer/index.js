import React, { Component } from 'react'
import { Step, Segment } from 'semantic-ui-react';
import RegistrationKeyInput from './RegistrationKeyInput'
import { DECK_OFFICER_STEP } from './../utils/constants'
import DeckPicker from './DeckPicker'
// import LanePicker from './LanePicker'
import VehicleModal from './VehicleModal/VehicleModal';
import DeckMap from '../DeckMap/DeckMap'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal';

const lanes = ["1","2","3","4","5"]
const decks = ["5","4","3","2","1"]
const frames = ["000","020","040","060","080","100"]
const steps = [
            {id:DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT, title:'Reg nr'},
            {id:DECK_OFFICER_STEP.DECK_PICKER, title:'Deck'},
            {id:DECK_OFFICER_STEP.LANE_PICKER, title:'Lane'}
]
export default class DeckOfficer extends Component {

    constructor(props){
        super(props);
        this.state = {
          registrationKey:"",
          deckNumber:"",
          laneNumber:"",
          frameNumber:"",
          confirmationModalOpen: false,
          currentStep:DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT,
          vehicleModalOpen: false,
          assignedVehicles:[]
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.vehicleModalAction = this.vehicleModalAction.bind(this)
        this.confirmationModalAction = this.confirmationModalAction.bind(this)

    }
    
    renderStepComponent(){
        let {currentStep,registrationKey,deckNumber,frameNumber,laneNumber,assignedVehicles} = this.state
        switch(currentStep){
            case DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT:
                return <RegistrationKeyInput onSubmit={this.handleSubmit}/>
            case DECK_OFFICER_STEP.DECK_PICKER:
                return <DeckPicker decks={decks} onSubmit={this.handleSubmit}/>
            case DECK_OFFICER_STEP.LANE_PICKER:
                // return <LanePicker  lanes={lanes} onSubmit={this.handleSubmit}
                //                     updateLaneNumber={(laneNumber) => this.setState({laneNumber})}/>
                return <DeckMap 
                            deckNumber={deckNumber} 
                            selectedLane={laneNumber} 
                            selectedFrame={frameNumber}
                            registrationKey={registrationKey}
                            lanes={lanes} 
                            decks={decks}
                            frames={frames}
                            assignedVehicles={assignedVehicles}
                            updateLaneAndFrame={(laneNumber,frameNumber) => this.setState({laneNumber,frameNumber})}
                            onSubmit={this.handleSubmit}
                        />
            default:
                return null
        }
    }

    handleSubmit(firstInput,secondInput = ""){

        if(firstInput === "") return

        switch(this.state.currentStep){
            case DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT:
                
                this.setState({
                    vehicleModalOpen: true, 
                    registrationKey: firstInput, 
                    currentStep: DECK_OFFICER_STEP.REGISTRATION_KEY_CONFIRM
                })
                break;

            case DECK_OFFICER_STEP.REGISTRATION_KEY_CONFIRM:

                this.setState({currentStep:DECK_OFFICER_STEP.DECK_PICKER})
                break;

            case DECK_OFFICER_STEP.DECK_PICKER:

                this.setState({
                    currentStep:DECK_OFFICER_STEP.LANE_PICKER,
                    deckNumber:firstInput
                })
                break;

            case DECK_OFFICER_STEP.LANE_PICKER:

                    if(secondInput === "") return
                    this.setState({
                        confirmationModalOpen:true,
                        laneNumber:firstInput,
                        frameNumber:secondInput
                    })
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
                    this.setState({ currentStep:DECK_OFFICER_STEP.LANE_PICKER,
                                    laneNumber:"",
                                    frameNumber:""
                                })
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

    confirmationModalAction(confirm){
        if(confirm){
            let {registrationKey,deckNumber,frameNumber,laneNumber, assignedVehicles} = this.state
            let newAssignedVehicle = {registrationKey,deckNumber,frameNumber,laneNumber}
            let newVehicles = [...assignedVehicles,newAssignedVehicle]
            this.setState({ 
                currentStep:DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT,
                registrationKey:"",
                deckNumber:"",
                laneNumber:"",
                frameNumber:"",
                confirmationModalOpen:false,
                assignedVehicles:newVehicles
            })
        } else{
            this.setState({confirmationModalOpen:false})
        }
    }
    vehicleModalAction(confirm){
        if(confirm){
            this.setState({
                vehicleModalOpen: false
            })
            this.handleSubmit(this.state.registrationKey)
        }else{
            this.setState({
                vehicleModalOpen: false,
                currentStep: DECK_OFFICER_STEP.REGISTRATION_KEY_INPUT,
                registrationKey: ""
            })
        }
    }

    render() {
        let {currentStep,registrationKey,deckNumber,frameNumber,laneNumber, confirmationModalOpen, vehicleModalOpen} = this.state

        return (
            <React.Fragment>
                <Segment>
                    <Step.Group>
                        {steps.map((step,ix) => 
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
                    <ConfirmationModal
                        open={confirmationModalOpen}
                        centered={false}
                        registrationKey={registrationKey}
                        deckNumber={deckNumber}
                        laneNumber={laneNumber}
                        frameNumber={frameNumber}
                        handleAction={this.confirmationModalAction}/>
                    <VehicleModal
                        open={vehicleModalOpen}
                        centered={false} 
                        registrationKey={this.state.registrationKey} 
                        handleAction={this.vehicleModalAction} />
                </Segment>

            </React.Fragment>
        )
    }
}
