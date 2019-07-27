import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import DeckOfficer from './DeckOfficer/index';
import TugMaster from './TugMaster/index';
export default class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={DeckOfficer}/>
                    <Route path='/deckofficer' component={DeckOfficer}/>
                    <Route path='/tugmaster' component={TugMaster}/>
                </Switch>
            </main>            
        )
    }
}
