import React, { Component } from 'react'
import './DeckMap.css'
import Lane from './Lane/Lane'
import { Button } from 'semantic-ui-react';

export default class DeckMap extends Component {
    render() {

        let {deckNumber, assignedVehicles, lanes, frames, selectedLane, selectedFrame, updateLaneAndFrame} = this.props

        if(deckNumber === ""){
            return null
        }

        let vehiclesInDeck = assignedVehicles.filter(v => v.deckNumber === deckNumber)
        return (
            <div className="DeckMap">
                {lanes.map((lane,ix) => {
                    let vehiclesInLane = vehiclesInDeck.filter(v => v.laneNumber === lane)
                    return (
                        <Lane   key={ix} 
                                lane={lane} 
                                frames={frames}
                                selectedLane={selectedLane} 
                                selectedFrame={selectedFrame} 
                                vehicles={vehiclesInLane} 
                                updateLaneAndFrame={updateLaneAndFrame}/>
                    )
                })}
                <Button positive onClick={() => this.props.onSubmit(selectedLane, selectedFrame)}>Continue</Button>
            </div>
            
        )
    }
}
