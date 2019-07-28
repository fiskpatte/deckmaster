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
        this.setState({laneNumber:lane})
    }
    render() {
        let {laneNumber, frameNumber} = this.state
        return (
            <React.Fragment >
                <Menu secondary>
                    {lanes.map((lane,ix) => {return <Menu.Item name={lane} key={ix} active={laneNumber === lane} onClick={() => this.onClick(lane)}/>})}
                </Menu>
                <Input autoFocus ref={ref => this.inputRef = ref} placeholder={120} onChange={(event) => this.onChange(event)}/>
                <Button primary onClick={() => this.props.onSubmit(laneNumber, frameNumber)}>Continue</Button>
            </React.Fragment>
        )
    }
}