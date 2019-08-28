import React, { Component } from 'react'
import { Button, Input, Menu } from 'semantic-ui-react';

const lanes = ["1","2","3","4","5"]

export default class LanePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
          laneNumber:"",
          frameNumber:""
        }
    }
    componentDidUpdate(){
        this.inputRef.focus()
    }
    onChange(event){
        this.setState({frameNumber: event.target.value})
    }
    onClick(lane){
        let suggestion = "";
        switch(lane){
            case "1":
                suggestion = "051"
                break
            case "2":
                suggestion = "152"
                break
            case "3":
                suggestion = "001"
                break
            case "4":
                suggestion = "420"
                break
            case "5":
                suggestion = "090"
                break
            default: break
        }
        this.setState({laneNumber: lane, frameNumber: suggestion})
        document.getElementById("FrameInput").value = suggestion
        document.getElementById("FrameInput").focus()

    }
    render() {
        let {laneNumber, frameNumber} = this.state
        return (
            <React.Fragment>
                <h4>Lane</h4>
                <Menu secondary>
                    {lanes.map((lane,ix) => {return <Menu.Item className="LaneMenuItem" name={lane} key={ix} active={laneNumber === lane} onClick={() => this.onClick(lane)}/>})}
                </Menu>
                <h4>Frame</h4>
                <Input id="FrameInput" ref={ref => this.inputRef = ref} onChange={(event) => this.onChange(event)}/>
                <Button positive onClick={() => this.props.onSubmit(laneNumber, frameNumber)}>Continue</Button>
            </React.Fragment>
        )
    }
}