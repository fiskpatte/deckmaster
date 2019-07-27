import React, { Component } from 'react'
import { Input } from 'semantic-ui-react';

export default class DeckOfficer extends Component {
    constructor(props){
        super(props);
        this.state = {
          registrationKey:""
        }
    }
    onChange(e){
        console.log(e)
    }
    render() {
        return (
            <div>
                <Input onChange={(e) => this.onChange(e)}/>
            </div>
        )
    }
}
