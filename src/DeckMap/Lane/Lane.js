import React, { Component } from 'react'
import classNames from 'classnames'
import './Lane.css'
import Frame from '../Frame/Frame'


export default class Lane extends Component {
    onClickLane(){
        let {lane, selectedLane, updateLaneAndFrame, vehicles, frames} = this.props
        //If lane is full, do nothing
        if(vehicles.length === frames.length){
            return
        }
        //If another lane is clicked, select that lane and suggest a frame. Otherwise onClickFrame will trigger
        if(lane !== selectedLane){
            let suggestedFrame = this.getSuggestedFrame(lane)
            updateLaneAndFrame(lane,suggestedFrame)
        }
    }
    onClickFrame(event,frame,isOccupied){
        let {lane, selectedLane, updateLaneAndFrame} = this.props
        //If selected lane is clicked and is not occupied, update frame. Otherwise do nothing
        if(lane === selectedLane && !isOccupied){
            event.stopPropagation();
            updateLaneAndFrame(lane,frame)
        }
    }
    getSuggestedFrame(lane){
        let {vehicles, frames} = this.props
        let notOccupiedFrames = frames.filter(frame => !vehicles.some(vehicle => vehicle.frameNumber === frame))
        if(notOccupiedFrames.length > 0){
            return notOccupiedFrames.reverse()[0]
        }
        return ""
    }
    render() {
        
        let {lane, selectedLane, selectedFrame, vehicles, frames} = this.props
        let isSelected = lane === selectedLane

        let laneStyle = classNames(
            'Lane',
            {'LaneSelected': isSelected}
        )
        
        return (
            <div className="LaneContainer flexrow" onClick={() => this.onClickLane()}>
                <h4 className='LaneLabel'>Lane {lane}</h4>
                <div className={laneStyle}>
                    <div className='FrameContainer flexrow'>
                        {frames.map((frame,ix) => {
                            let vehicleInFrame = vehicles.find(v => v.frameNumber === frame)
                            return (
                                <Frame  key={ix} 
                                        frame={frame} 
                                        selectedFrame={selectedFrame} 
                                        vehicle={vehicleInFrame} 
                                        onClickCallback={(event,frame,isOccupied) => this.onClickFrame(event,frame,isOccupied)}
                                        disabled={!isSelected}/>
                            )
                        })}
                    </div>
                    
                </div> 
            </div>
            
        )
    }
}
