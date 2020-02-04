import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react';
import './index.css'

export default class TugMaster extends Component {
    render() {
        return (


            <Segment className="TugmasterInstruction">
                <h4>Next instruction</h4>
                <div className="flexcolumn">
                    <div className="TugmasterRow">
                        <label className="TugmasterLabel">Go to</label>
                        <span className="TugmasterValue">22C</span>
                    </div>
                    <div className="TugmasterRow">
                        <label className="TugmasterLabel">Get vehicle</label>
                        <span className="TugmasterValue">ABC 123</span>
                    </div>
                    <div className="TugmasterRow">
                        <label className="TugmasterLabel">Place at</label>
                        
                        <span className="TugmasterValue">Deck 3 - Lane 2 - Frame 122</span>
                        
                    </div>
                    <Button className="DoneButton" positive>Done</Button>
                </div>
            </Segment>
            
        )
    }
}
