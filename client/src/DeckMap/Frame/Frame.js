import React, { Component } from 'react'
import classNames from 'classnames'
import './Frame.css'

export default class Frame extends Component {
    render() {

        let {frames, frame, vehicle, selectedFrame, onClickCallback, disabled} = this.props
        let isSelected = !disabled && frame === selectedFrame
        let isOccupied = !!vehicle
        let isLast = frames[frames.length - 1] === frame
        let frameStyle = classNames(
            'Frame',
            'flexcolumn',
            {
                'FrameOccupied': isOccupied,
                'FrameSelected': isSelected,
                'FrameLast':isLast
            }
        )

        return (
            <div className={frameStyle} onClick={event => onClickCallback(event,frame,isOccupied)}>
                <div>{frame}</div>
                {vehicle ? <div>{vehicle.registrationKey}</div> : null}
            </div>
        )
    }
}
