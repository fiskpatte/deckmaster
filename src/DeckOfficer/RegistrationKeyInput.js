import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react';

export default class RegistrationKeyInput extends Component {
    constructor(props){
        super(props);
        this.state = {
          registrationKey:""
        }
    }
    componentDidUpdate(){
        this.inputRef.focus()
    }
    onChange(event){
        this.setState({registrationKey: event.target.value})
    }
    render() {
        return (
            <div >
                <Input autoFocus ref={ref => this.inputRef = ref} onChange={(event) => this.onChange(event)}/>
                <Button primary onClick={() => this.props.onSubmit(this.state.registrationKey)}>Continue</Button>
            </div>
        )
    }
}