import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import './DeckPicker.css'

export default class DeckPicker extends Component {
    render() {
        return (
            <div>
                <h4>Deck</h4>
                <div className="flexcolumn">
                    {this.props.decks.map((d,ix) => {return <Button className="DeckButton" positive key={ix} onClick={() => this.props.onSubmit(d)}>{"Deck " + d}</Button>})}
                </div>
            </div>            
        )
    }
}